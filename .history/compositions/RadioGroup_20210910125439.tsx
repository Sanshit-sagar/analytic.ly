import React, { createContext, useRef, useContext } from 'react'
import { styled } from '../stitches.config'

import { useRadioGroup, useRadio } from '@react-aria/radio'
import { useRadioGroupState } from '@react-stately/radio'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'
import { Text } from '../primitives/Text'

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: '100%',
    boxShadow: `0 2px 10px $border`,
    border: '1px solid $border',
    '&:hover': { 
        backgroundColor: '$accentFull', 
        borderColor: '$border3' 
    },
    '&:focus': { boxShadow: `0 0 0 2px $accentDulled` },
});

  const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: 11,
      height: 11,
      borderRadius: '50%',
      backgroundColor: '$accentContrast',
    },
});

  
let RadioContext = createContext(null);

export function RadioGroup(props: any) {
  let {children, label} = props;
  let state = useRadioGroupState(props);
  let {radioGroupProps, labelProps} = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
        <span {...labelProps}> {label} </span>
        
        <RadioContext.Provider value={state}>
            {children}
        </RadioContext.Provider>
    </div>
  );
}



export function Radio(props: any) {
  let {children} = props
  let ref = useRef(null)
  let state = useContext(RadioContext)
  let { inputProps } = useRadio(props, state, ref)
  let { isFocusVisible, focusProps } = useFocusRing()

  let isSelected = state.selectedValue === props.value
  let strokeWidth = isSelected ? 6 : 2

  return (

    <label style={{display: 'flex', alignItems: 'center'}}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <svg width={24} height={24} aria-hidden="true" style={{marginRight: 4}}>
        <ColoredRadioGroupRadio
          stroke={isSelected ? 'orange' : 'gray'}
          strokeWidth={isSelected ? 6 : 2}
        />
        {isFocusVisible && <RadioGroupIndicator />}
      </svg>
      <Text> {children} </Text>
    </label>
  );
}