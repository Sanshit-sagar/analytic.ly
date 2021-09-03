const RadioGroup = React.forwardRef<RadioGroupElement, RadioGroupProps>((props, forwardedRef) => {
    const {
      name,
      'aria-labelledby': ariaLabelledby,
      defaultValue,
      value: valueProp,
      required = false,
      orientation,
      dir = 'ltr',
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const labelId = useLabelContext();
    const labelledBy = ariaLabelledby || labelId;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
  
    return (
      <RadioGroupProvider name={name} value={value} required={required} onValueChange={setValue}>
        <RovingFocusGroup asChild orientation={orientation} dir={dir} loop={loop}>
          <Primitive.div
            role="radiogroup"
            aria-labelledby={labelledBy}
            dir={dir}
            {...groupProps}
            ref={forwardedRef}
          />
        </RovingFocusGroup>
      </RadioGroupProvider>
    );
  });
  
  RadioGroup.displayName = RADIO_GROUP_NAME;
  
  /* -------------------------------------------------------------------------------------------------
   * RadioGroupItem
   * -----------------------------------------------------------------------------------------------*/
  
  const ITEM_NAME = 'RadioGroupItem';
  
  type RadioGroupItemElement = React.ElementRef<typeof Radio>;
  type RadioGroupItemProps = Radix.MergeProps<
    Omit<Radix.ComponentPropsWithoutRef<typeof Radio>, 'onCheck'>,
    { value: string; name?: never }
  >;
  
  const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
    (props, forwardedRef) => {
      const { disabled, ...itemProps } = props;
      const context = useRadioGroupContext(ITEM_NAME);
      const ref = React.useRef<React.ElementRef<typeof Radio>>(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const checked = context.value === itemProps.value;
      return (
        <RovingFocusItem asChild focusable={!disabled} active={checked}>
          <Radio
            disabled={disabled}
            required={context.required}
            checked={checked}
            {...itemProps}
            name={context.name}
            ref={composedRefs}
            onCheck={() => context.onValueChange(itemProps.value)}
            onFocus={composeEventHandlers(itemProps.onFocus, () => {
              /**
               * Roving index will focus the radio and we need to check it when this happens.
               * We do this imperatively instead of updating `context.value` because changing via
               * state would not trigger change events (e.g. when in a form).
               */
              if (context.value !== undefined) ref.current?.click();
            })}
          />
        </RovingFocusItem>
      );
    }
  );
  
  RadioGroupItem.displayName = ITEM_NAME;
  
  const RadioGroupIndicator = extendPrimitive(RadioIndicator, { displayName: 'RadioGroupIndicator' });
  
  const Root = RadioGroup;
  const Item = RadioGroupItem;
  const Indicator = RadioGroupIndicator;
  
  export {
    RadioGroup,
    RadioGroupItem,
    RadioGroupIndicator,
    //
    Root,
    Item,
    Indicator,
  };