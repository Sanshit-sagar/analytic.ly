import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { useAtom } from 'jotai' 
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import { Flex } from '../../../primitives/Flex'
import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'
import { Number } from '../../../animated/Number'

import {
    IabTestGroup,
    IabTest
    MIN_ALTERNATES,
    MAX_ALTERNATES,
    MAX_SLIDER_VALUE,
    MIN_SLIDER_VALUE,
    abTestPercentagesAtom,
    abTestNumGroupsAtom,
    abTestPercentagesByGroupAtom,

} FROM '../../../atoms/abtesting'

interface IabTestGroup {
    id: number;
    url: string | undefined;
    percentage: number | undefined; 
};

export const VALID_URL_REGEX: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const AbTestingContainer = styled('div', {
    height: '100%',
    width: '100%',
    padding: 10,
    display: 'flex',
    fd: 'column',
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1',
    margin: 0
});

const SliderWithCounter = styled('div', {
    bc: '$neutral', 
    display: 'flex', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-end', 
    gap: '$3',
    border: 'thin solid $border', 
    '&:hover': { 
        borderColor: '$border3' 
    }, 
});

const handleInitValues = (alternateCount: number, stepSize: number): number[] => {
    let temp: number[] = [...Array(alternateCount)]; 
    temp[0] = 0
    for(let i = 1; i<=alternateCount; i++) temp[i] = Math.round((temp[i-1] + stepSize) * 100)/100
    return temp
}

const Controller = () => {
    const setAbTestPercentages = useUpdateAtom(abTestPercentagesAtom)
    const [groupCount, setGroupCount] = useAtom(abTestNumGroupsAtom)

    let stepSize = (maxValue - minValue) / groupCount    
    const [values, setValues] = useState([...handleInitValues(groupCount, stepSize)])

    const handleGroupCountChange = (updatedGroupCount: number) => {
        setGroupCount(updatedGroupCount)
        stepSize = (maxValue-minValue)/updatedGroupCount
        const temp = handleInitValues(updatedGroupCount, stepSize)
        setAbTestPercentages([...temp])
        setValues([...temp])
    }

    return (
        <SliderWithCounter>
            <NumberField
                label='Alternates'
                value={groupCount}
                onChange={handleGroupCountChange}
                minValue={MIN_ALTERNATES}
                maxValue={MAX_ALTERNATES}
            /> 
            <RangeSlider
                id={`Alt-Url-Split-for-${maxValue}-to-${minValue}`}
                label={`Alternate-URLs`}
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[...values]}
                values={values}
                step={0.01}
            />
        </SliderWithCounter>
    );
}
// </SliderWithCount>

const AbPercentages = () => {
    const groupPercentages = useAtomValue(abTestPercentagesByGroupAtom)

    return (
        <Flex css={{ fd: 'row', jc: 'space-evenly', ai: 'center', gap: '$3' }}>
            {groupPercentages.map((pctByGroup: number) => (
                <Number value={pctByGroup} /> 
            ))}
        </Flex>
    )
}

export const AbTestingTab = () => {

    return (
        <AbTestingContainer>
            <Controller />
            <AbPercentages /> 
        </AbTestingContainer>
    )
}
