import React, { useRef } from 'react'

import { styled } from '../stitches.config'

import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { BorderlessControlGroup, Label } from '../primitives/FieldSet'

import { useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'

import { mergeProps } from '@react-aria/utils'
import { useFocusRing } from '@react-aria/focus'
import { useNumberFormatter } from '@react-aria/i18n'
import { VisuallyHidden } from '@react-aria/visually-hidden'

const SliderControlGroup = styled('div', {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    jc: 'flex-start',
    alignItems: 'space-between',
    touchAction: 'none'
});

const Track = styled('div', {
    position: 'absolute',
    bc: '$accent',
    height: 2,
    top: 10,
    width: '100%'
});

const ThumbContainer = styled('div', {
    position: 'absolute',
    top: 4,
    transform: 'translateX(-50%)'
});

const StyledThumb = styled('div', {
    width: 15,
    height: 15,
    border: '1px solid',
    borderRadius: '$1',
});

const SliderOutput = styled(Text, {
    color: '$accent',
    mb: '$2'
});

const TrackContainer = styled('div', {
    position: 'relative',
    height: 30,
    width: '100%'
})

interface IStyledColoredThumbProps {
    children: Element | any | React.ReactNode; 
    thumbProps: any;
    isFocusVisible: boolean;
    isThumbDragging: boolean; 
}

interface SliderState {
    values: number[];
    focusedThumb: number | undefined;
    step: number;
    getThumbValue: (index: number) => number;
    setThumbValue: (index: number, value: number) => void;
}

interface IThumbsGroupProps {
    state: SliderState;
    trackRef: React.RefObject<HTMLElement>;
    thumbsCount: number; 
}

const StyledOutputText = ({ children, outputProps }: { children: any; outputProps: any }) => {
    return (
        <SliderOutput {...outputProps}>
            <Text size='1' css={{ color: '$accent', '&:hover': { color: '$funky' }}}> 
                {children} 
            </Text>
        </SliderOutput>
    );
}

const StyledColoredThumb = ({ children, thumbProps, isFocusVisible, isThumbDragging }: IStyledColoredThumbProps) => {
    return (
        <StyledThumb 
            {...thumbProps}
            css={{
                borderColor: isFocusVisible ? '$funky' : isThumbDragging ? '$border' : '$border3', 
                backgroundColor: isFocusVisible ? '$accent' : isThumbDragging ? '$accent' : '$accentFull' 
            }}
        >
            {children}
        </StyledThumb>
    )
}

function Thumb(props: any) {
    let inputRef = useRef(null)
    let { state, trackRef, index } = props
    let { thumbProps, inputProps } = useSliderThumb({ index, trackRef, inputRef }, state)
    let { focusProps, isFocusVisible } = useFocusRing();

    return (
        <ThumbContainer 
            css={{ left: `${state.getThumbPercent(index) * 100}%` }}
        >
            <StyledColoredThumb
                thumbProps={thumbProps}
                isFocusVisible={isFocusVisible}
                isThumbDragging={state.isThumbDragging(index)}
            >
              <VisuallyHidden>
                <input 
                    ref={inputRef} 
                    {...mergeProps(inputProps, focusProps)} 
                />
              </VisuallyHidden>
            </StyledColoredThumb>
        </ThumbContainer>
    );
}

const ThumbsGroup = ({ state, trackRef, thumbsCount }: IThumbsGroupProps) => {

    return (
        <Flex css={{ width: '100%', fd: 'row' }}>
            {[...Array(thumbsCount)].map((_: number, index: number) => { 
                return (
                    <Thumb 
                        index={index}
                        state={state}
                        trackRef={trackRef} 
                        styled={{ color: 'red' }}
                    />
                );
            })}
        </Flex>
    )
}


export function RangeSlider(props: any) {
    let trackRef = useRef(null)
    let numberFormatter = useNumberFormatter(props.formatOptions)
    let state = useSliderState({ ...props, numberFormatter })
    let { groupProps, trackProps, labelProps, outputProps } = useSlider(props, state, trackRef);
  
    let values: number[] = [...state?.values] || []
    let realValues = props.values;

    React.useEffect(() => {
        realValues.map((val: number, i: number) => state.setThumbPercent(i, val));
        state.setThumbEditable(0, false);
        state.setThumbEditable(realValues.length - 1, false); 
    }, [realValues.length])

    return (
        // <BorderlessControlGroup>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$2'}}>
                {props.label && <Label {...labelProps}>
                    {props.label}
                </Label>}
                <StyledOutputText 
                    outputProps={outputProps}
                    children={`ALTERNATE URLs: ${values?.length}`}
                /> 
            </Flex>
            
            <SliderControlGroup {...groupProps}>
                <TrackContainer
                    {...trackProps}
                    ref={trackRef}
                >
                    <Track /> 
                    <ThumbsGroup 
                        state={state} 
                        trackRef={trackRef} 
                        thumbsCount={realValues.length}
                    />
                </TrackContainer>
            </SliderControlGroup>
            {/* <p> {JSON.stringify(realValues)} </p> */}
            {/* <p> {JSON.stringify(values)} </p> */}
        //  </BorderlessControlGroup>
    );
}