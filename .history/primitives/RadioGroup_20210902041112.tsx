import React, { createContext } from 'react'

function getState(checked: boolean) {
    return checked ? 'checked' : 'unchecked';
}

const RADIO_NAME = 'Radio';

type RadioContextValue = { checked: boolean; disabled?: boolean };
const [RadioProvider, useRadioContext] = createContext<RadioContextValue>(RADIO_NAME);

type RadioElement = React.ElementRef<typeof Primitive.button>;
type RadioProps = Radix.MergeProps<Radix.ComponentPropsWithoutRef<typeof Primitive.button>,
  {
    checked?: boolean;
    required?: boolean;
    onCheck?(): void;
  }
>;

const Radio = React.forwardRef<RadioElement, RadioProps>((props, forwardedRef) => {
  const {
    'aria-labelledby': ariaLabelledby,
    name,
    checked = false,
    required,
    disabled,
    value = 'on',
    onCheck,
    ...radioProps
  } = props;
  const [button, setButton] = React.useState<HTMLButtonElement | null>(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
  const labelId = useLabelContext(button);
  const labelledBy = ariaLabelledby || labelId;
  const hasConsumerStoppedPropagationRef = React.useRef(false);
  // We set this to true by default so that events bubble to forms without JS (SSR)
  const isFormControl = button ? Boolean(button.closest('form')) : true;

  return (
    <RadioProvider checked={checked} disabled={disabled}>
      <Primitive.button
        type="button"
        role="radio"
        aria-checked={checked}
        aria-labelledby={labelledBy}
        data-state={getState(checked)}
        data-disabled={disabled ? '' : undefined}
        disabled={disabled}
        value={value}
        {...radioProps}
        ref={composedRefs}
        onClick={composeEventHandlers(props.onClick, (event) => {
          // radios cannot be unchecked so we only communicate a checked state
          if (!checked) onCheck?.();
          if (isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            // if radio is in a form, stop propagation from the button so that we only propagate
            // one click event (from the input). We propagate changes from an input so that native
            // form validation works and form events reflect radio updates.
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })}
      />
      {isFormControl && (
        <BubbleInput
          control={button}
          bubbles={!hasConsumerStoppedPropagationRef.current}
          name={name}
          value={value}
          checked={checked}
          required={required}
          disabled={disabled}
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          style={{ transform: 'translateX(-100%)' }}
        />
      )}
    </RadioProvider>
  );
});

Radio.displayName = RADIO_NAME;