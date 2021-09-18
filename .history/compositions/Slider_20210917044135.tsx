import React, { useEffect, useRef } from 'react'
import { styled } from '../stitches.config'

import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'

import { useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'

import { mergeProps } from '@react-aria/utils'
import { useFocusRing } from '@react-aria/focus'
import { useNumberFormatter } from '@react-aria/i18n'
import { VisuallyHidden } from '@react-aria/visually-hidden'

import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { 
    abTestPercentagesAtom, 
    abTestNumGroupsAtom  
} from '../atoms/abtesting'

const SliderControlGroup = styled('div', {
    height: '50px',
    width: '500px',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    padding: '$2 $4',  
    border: 'thin solid $border',                     
    '&:hover': {
        borderColor: '$border3',
        color: '$accent'
    }
});

const Track = styled('div', {
    position: 'absolute',
    borderLeft: '10px solid $funky',
    bc: '$accent',
    height: 2,
    top: 12,
    width: '100%'
});

const ThumbContainer = styled('div', {
    position: 'absolute',
    top: -5,
    transform: 'translateX(-50%)'
});

const StyledThumb = styled('div', {
    width: 15,
    height: 15,
    border: '1px solid',
    borderRadius: '$1',
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
    let { focusProps, isFocusVisible } = useFocusRing()

    return (
            <ThumbContainer 
                css={{ left: `${state.getThumbPercent(index) * 100}%` }}
            >
                <Text css={{ color: '$accent' }}> 
                    {`${Math.round(state.getThumbPercent(index) * 100)}%`} 
                </Text>

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

    const groupCount = useAtomValue(abTestNumGroupsAtom)
    const setAbPercentages = useUpdateAtom(abTestPercentagesAtom)
    const numberFormatter = useNumberFormatter(props.formatOptions)

    let trackRef = useRef(null)
    let state = useSliderState({ ...props, numberFormatter })
    let { groupProps, trackProps } = useSlider(props, state, trackRef)

    let realValues = props.values;

    useEffect(() => {
        realValues.map((val: number, i: number) => state.setThumbPercent(i, val));
    }, [realValues.length])

    useEffect(() => {
        if(groupCount >= 2 && groupCount < state?.values.length){
            let tempValues: number[] = [...Array(groupCount)].map((_: number, i: number) => state.values[i])
            setAbPercentages([...tempValues])
        } else {
            setAbPercentages([...state?.values] || [])
        }
    }, [...state?.values]);

    return (
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
    );
}