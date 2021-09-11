import React, { createContext, useRef, useContext } from 'react'
import { styled } from '../stitches.config'

import { useRadioGroup, useRadio } from '@react-aria/radio'
import { useRadioGroupState } from '@react-stately/radio'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'
import { Text } from '../primitives/Text'


const StyledRadio = styled('checkbox')

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
        <circle
          cx={12}
          cy={12}
          r={4}
          fill="none"
          stroke={isSelected ? 'orange' : 'gray'}
          strokeWidth={strokeWidth}
        />
        {isFocusVisible && (
          <circle
            cx={12}
            cy={12}
            r={6}
            fill="none"
            stroke="orange"
            strokeWidth={2}
          />
        )}
      </svg>
      <Text> {children} </Text>
    </label>
  );
}