import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { useAtom } from 'jotai' 
import { useUpdateAtom } from 'jotai/utils'

import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'

import {
    minValue,
    maxValue,
    MIN_ALTERNATES,
    MAX_ALTERNATES,
    abTestPercentagesAtom,
    abTestNumGroupsAtom
} from '../../../atoms/abtesting'

import { AbTestConfigsTree } from './ConfigTree'
import { Flex } from '../../../primitives/Flex'

export const VALID_URL_REGEX: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

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
        <Flex 
            css={{ 
                height: '300px', 
                width: '700px', 
                fd: 'column', 
                jc: 'space-between', 
                ai: 'stretch', 
                border: '1px solid $border', 
                br: '$2',
                '&:hover': { 
                    borderColor: '$border3'
                }  
            }}
        >
            <Flex css={{ height: '200px', width: '100%', fd: 'column', jc: 'flex-start', ai: 'flex-end', gap: '$1' }}>
                <NumberField
                    label='Alternates'
                    value={groupCount}
                    onChange={handleGroupCountChange}
                    minValue={MIN_ALTERNATES}
                    maxValue={MAX_ALTERNATES}
                /> 
                <AbTestConfigsTree />
            </Flex>

            <RangeSlider
                id={`Alt-Url-for-${minValue}-to-${maxValue}`}
                label={`Alternate-URLs`}
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[...values]}
                values={values}
                step={0.01}
            />
            
        </Flex>
    );
}

export const AbTestingTab = () => <Controller />
