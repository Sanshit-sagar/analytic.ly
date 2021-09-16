import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { atom, useAtom } from 'jotai' 
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'
import { RunningNumber } from '../../../animated/Number'
import { CustomTree } from '../../../compositions/Tree'

import {
    minValue,
    maxValue,
    MIN_ALTERNATES,
    MAX_ALTERNATES,
    abTestPercentagesAtom,
    abTestNumGroupsAtom,
    abTestPercentagesByGroupAtom
} from '../../../atoms/abtesting'

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

const AnimatedNumberGroup = styled('div', {
    width: '100%',
    display: 'flex',
    fd: 'row', 
    jc: 'space-evenly', 
    ai: 'center', 
    gap: '$3'
})

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
                id={`Alt-Url-for-${minValue}-to-${maxValue}`}
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


interface IAbTestConfig {
    id: string; 
    url: string; 
    percentage: number;
}

const abTestConfigsAtom = atom([ 
    { id: 'test1', url: '', percentage: 50 }, 
    { id: 'test2', url: '', percentage: 50 }
]);

const updateAbTestConfigsAtom = atom(
    null, 
    (get, set, update: ) => {
        let testCount = get(abTestNumGroupsAtom)
        let groupPercentages = get(abTestPercentagesByGroupAtom)

        let config: IAbTestConfig[] = [...Array(testCount)].map((index: number) => {
            return {
                id: `test${index}`,
                url: ``,
                percentage: groupPercentages[index],
            }
        });
        return config; 
    }
);


const AbPercentages = () => {
    const groupPercentages = useAtomValue(abTestPercentagesByGroupAtom)

    return (
        <AnimatedNumberGroup>
            {groupPercentages.map((pctByGroup: number) => (
                <RunningNumber value={pctByGroup} />
            ))}
        </AnimatedNumberGroup>
    )
}

const ConfigTree = () => {
    const abTestConfigs = useAtomValue(abTestConfigsAtom)

    return (
        <CustomTree 
            slug={'the-best-slug-5-evah'} 
            abTestConfigs={abTestConfigs} 
        />
    )
}

export const AbTestingTab = () => (
    <AbTestingContainer>
        <Controller />
        <AbPercentages /> 
        <ConfigTree /> 
    </AbTestingContainer>
);
