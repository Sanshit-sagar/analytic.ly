import React from 'react'

import { styled } from '../../../stitches.config'

import { Text } from '../../../primitives/Text'
import { NumberField } from '../../../compositions/NumberField' 

import { useSlider, useSliderThumb } from '@react-aria/slider'
import { useSliderState } from '@react-stately/slider'
import { useFocusRing } from '@react-aria/focus'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { mergeProps } from '@react-aria/utils'
import { useNumberFormatter } from '@react-aria/i18n'

const AbTestingContainer = styled('div', {
    height: '100%',
    width: '100%',
    padding: 10,
    display: 'flex',
    fd: 'column',
    jc: 'center', 
    ai: 'center', 
    gap: '$1',
    margin: 0
});

function RangeSlider(props) {
    let trackRef = React.useRef(null);
  
    let numberFormatter = useNumberFormatter(props.formatOptions);
    let state = useSliderState({...props, numberFormatter});
    let {groupProps, trackProps, labelProps, outputProps} = useSlider(
      props,
      state,
      trackRef
    );
  
    return (
        <div
            {...groupProps}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 300,
              touchAction: 'none'
            }}
        >
          <div style={{display: 'flex', alignSelf: 'stretch'}}>
            {props.label && <label {...labelProps}>{props.label}</label>}
            <output {...outputProps} style={{flex: '1 0 auto', textAlign: 'end'}}>
              {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
            </output>
          </div>
          <div
            {...trackProps}
            ref={trackRef}
            style={{
              position: 'relative',
              height: 30,
              width: ' 100%'
            }}>
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'grey',
                height: 3,
                top: 13,
                width: '100%'
              }}
            />
            <Thumb index={0} state={state} trackRef={trackRef} />
            <Thumb index={1} state={state} trackRef={trackRef} />
          </div>
        </div>
    );
}
  


const AbTestingTab = () => {
    const [val, setVal] = React.useState(0.05)

    const handleChange = (updatedValue: number) => {
        setVal(updatedValue)
    }

    return (
        <AbTestingContainer>
            <NumberField
                label={'TEST'}
                value={val}
                onChange={handleChange}
                formatOptions={{
                    style: 'percent'
                }}
            />
            <Text> Current Value: {Math.round(val*100)}% </Text>
        </AbTestingContainer>
    )
}

export default AbTestingTab