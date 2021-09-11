import React, { useRef } from 'react'

import { styled } from '../stitches.config'

import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { BorderlessControlGroup, Label } from '../primitives/FieldSet'

import { SliderState, useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'

import { useFocusRing } from '@react-aria/focus'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { mergeProps } from '@react-aria/utils'
import { useNumberFormatter } from '@react-aria/i18n'

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
    top: 13,
    width: '100%'
});

const ThumbContainer = styled('div', {
    position: 'absolute',
    top: 4,
    transform: 'translateX(-50%)'
});

const StyledThumb = styled('div', {
    width: 20,
    height: 20,
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

interface IThumbInfo {
    id: number;
    initialValue: number;
    minValue?: number;
    maxValue?: number; 
    label: string; 
}

interface IAriaSliderProps {
    orientation?: boolean;
    isDisabled?: boolean;
    onChangeEnd?: (value: number) => void;
    minValue?: number;
    maxValue?: number;
    step?: number;
    value?: number;
    defaultValue?: number; 
    onChange?: (value: number) => void;
    id?: string;
}

interface IThumbsGroupProps {
    props: IAriaSliderProps;
    state: SliderState;
    trackRef: React.RefObject<HTMLElement>;
    thumbsCount: number; 
}

const ThumbsGroup = ({ props, state, trackRef, thumbsCount }: IThumbsGroupProps) => {
    let sliderProps: IAriaSliderProps = props

    let stepSize: number = sliderProps?.step || 0.01
    let sliderMin: number = !sliderProps?.minValue ? 0 : Math.max(0, sliderProps?.minValue)
    let sliderMax: number = !sliderProps?.maxValue ? 100 : Math.min(100, sliderProps?.maxValue)

    let range: number = sliderMax - sliderMin
    let avgPartition: number = Math.round(range/thumbsCount)
    let partitionSize: number = !stepSize ? (avgPartition ? avgPartition : 1) : stepSize

    let thumbGroupInfo: IThumbInfo[] = [];
   
    for(let i = 0; i <= thumbsCount; i++) {
        thumbGroupInfo.push({
            id: i,
            initialValue: i*(partitionSize) + 1,
            minValue: Math.max(sliderMin, i*(partitionSize) + 1),
            maxValue: Math.min(sliderMax, (i+1)*(partitionSize)),
            label: `Thumb-${i}`,
        });
    }

    return (
        <>
            {thumbGroupInfo.map((thumbInfo: IThumbInfo, _: number) => { 
                return (
                    <Thumb 
                        id={thumbInfo.id}
                        index={thumbInfo.id} 
                        state={state} 
                        trackRef={trackRef} 
                    />
                );
            })}

        </>
    )
}

export function RangeSlider(props: any) {


    let trackRef = useRef(null)
    let numberFormatter = useNumberFormatter(props.formatOptions)
    let state = useSliderState({ ...props, numberFormatter })
    let { groupProps, trackProps, labelProps, outputProps } = useSlider(props, state, trackRef);
  
    return (
        <BorderlessControlGroup>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$2'}}>
                {props.label && <Label {...labelProps}>
                    {props.label}
                </Label>}
                <StyledOutputText 
                    outputProps={outputProps}
                    children={`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)} - ${state.getThumbValueLabel(2)}`}
                /> 
            </Flex>
            
            <SliderControlGroup {...groupProps}>
                <TrackContainer
                    {...trackProps}
                    ref={trackRef}    
                >
                    <Track /> 
                    <ThumbsGroup 
                        sliderProps={...props}
                        state={state} 
                        trackRef={trackRef} 
                    />
                </TrackContainer>
            </SliderControlGroup>
        </BorderlessControlGroup>
    );
}