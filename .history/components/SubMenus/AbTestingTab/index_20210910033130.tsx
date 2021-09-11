import React, { useRef } from 'react'

import { styled } from '../../../stitches.config'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'

import { NumberField } from '../../../compositions/NumberField' 

import { useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'

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

function Thumb(props: any) {
    let inputRef = useRef(null)
    let { state, trackRef, index } = props
    let { thumbProps, inputProps } = useSliderThumb({ index, trackRef, inputRef }, state)
  
    let {focusProps, isFocusVisible} = useFocusRing();
    return (
      <div
        style={{
          position: 'absolute',
          top: 4,
          transform: 'translateX(-50%)',
          left: `${state.getThumbPercent(index) * 100}%`
        }}>
        <div
          {...thumbProps}
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: isFocusVisible
              ? 'orange'
              : state.isThumbDragging(index)
              ? 'dimgrey'
              : 'gray'
          }}>
          <VisuallyHidden>
            <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
          </VisuallyHidden>
        </div>
      </div>
    );
}

function RangeSlider(props: any) {

    let trackRef = useRef(null)
    let numberFormatter = useNumberFormatter(props.formatOptions)
    let state = useSliderState({ ...props, numberFormatter })
    let { groupProps, trackProps, labelProps, outputProps } = useSlider(props, state, trackRef);
  
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
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$3' }}>
                {props.label && 
                    <Text {...labelProps}>
                        {props.label}
                    </Text>
                }

                <Text>
                  {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
                </Text>
          </Flex>

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
            <RangeSlider
                label="Price Range"
                formatOptions={{style: 'currency', currency: 'USD'}}
                maxValue={500}
                defaultValue={[100, 350]}
                step={10}
            />
        </AbTestingContainer>
    )
}

export default AbTestingTab