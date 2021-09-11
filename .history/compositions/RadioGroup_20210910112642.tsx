import {useRadioGroupState} from '@react-stately/radio'
import {VisuallyHidden} from '@react-aria/visually-hidden'
import {useFocusRing} from '@react-aria/focus'

// RadioGroup is the same as in the previous example
let RadioContext = React.createContext(null);

function RadioGroup(props) {
  let {children, label} = props;
  let state = useRadioGroupState(props);
  let {radioGroupProps, labelProps} = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  );
}

function Radio(props) {
  let {children} = props;
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let {inputProps} = useRadio(props, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  let isSelected = state.selectedValue === props.value;
  let strokeWidth = isSelected ? 6 : 2;

  return (
    <label style={{display: 'flex', alignItems: 'center'}}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg width={24} height={24} aria-hidden="true" style={{marginRight: 4}}>
        <circle
          cx={12}
          cy={12}
          r={8 - strokeWidth / 2}
          fill="none"
          stroke={isSelected ? 'orange' : 'gray'}
          strokeWidth={strokeWidth}
        />
        {isFocusVisible && (
          <circle
            cx={12}
            cy={12}
            r={11}
            fill="none"
            stroke="orange"
            strokeWidth={2}
          />
        )}
      </svg>
      {children}
    </label>
  );
}