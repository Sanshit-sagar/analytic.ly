import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'

import { useAtom, atom } from 'jotai' 
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

export const ONE_PERCENT = 0.01
export const ONE_HUNDRED_PERCENT = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

export const VALID_URL_REGEX: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const minValue = ONE_PERCENT
const maxValue = ONE_HUNDRED_PERCENT

interface IabTestGroup {
    id: number;
    url: string | undefined;
    percentage: number | undefined; 
};

export const abTestPercentagesAtom = atom([0.5, 0.5])
export const abTestNumGroupsAtom = atom(MIN_ALTERNATES)
export const abTestPercentagesByGroupAtom = atom(
    (get) => {
        let firstIndex = 1;
        let percentages = get(abTestPercentagesAtom)
        let percentagesIndicies = Array(percentages.length - 1) 
        percentages.map((currentPercentage: number, idx: number) => {
            if(idx !== firstIndex) {
                return currentPercentage - percentages[idx - 1]
            }
        })
    }
)

const abTestGroups: IabTestGroup[] = [
    { id: 0, url: undefined, percentage: 50 }, 
    { id: 1, url: undefined, percentage: 50 },
]

export const abTestGroupsAtom = atom([...abTestGroups])
export const setUrlAtIndexInTestGroup = atom(
    null,
    (get, set, update: { url: string; index: number; }) => {
        set(abTestGroupsAtom, [
            ...get(abTestGroupsAtom).slice(0, update.index),
            { 
                ...abTestGroups[update.index], 
                url: update.url 
            },
            ...get(abTestGroupsAtom).slice(update.index),
        ]);
    }
);



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
        <Box
            css={{ 
                bc: '$neutral', display: 'flex', fd: 'column', jc: 'flex-start', ai: 'flex-end', gap: '$3',
                border: 'thin solid $border', '&:hover': { borderColor: '$border3' }, 
            }}
        >
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
        </Box>
    );
}

const AbPercentages = () => {
    const abTestPercentages = useAtomValue(abTestPercentagesAtom)

    return (
        <Flex css={{ fd: 'row', jc: 'space-evenly', ai: 'center', gap: '$3' }}>
            {abTestPercentages.map((abpct: number, index: number) => (
                <Text 
                    key={index}
                    size='4' 
                    css={{ color: '$funkyText', '&:hover': { color: '$funky' }}}
                >
                    {`${Math.round(abpct*100)}`}
                </Text>
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
