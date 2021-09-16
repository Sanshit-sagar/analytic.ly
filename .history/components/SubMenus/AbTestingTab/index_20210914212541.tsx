import React from 'react'

import { styled } from '../../../stitches.config'

import { Flex } from '../../../primitives/Flex'
import { Toolbar, ToolbarSeparator } from '../../../primitives/Toolbar'

import { RangeSlider } from '../../../compositions/Slider'
import { TextField } from '../../../compositions/TextField'
import { NumberField } from '../../../compositions/NumberField'

import { useAtom, atom } from 'jotai' 

import { AbTestingGroup } from './AlternatesGroup'

export const ONE_PERCENT = 0.01
export const ONE_HUNDRED_PERCENT = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

export const VALID_URL_REGEX: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const alternateCountAtom = atom(MIN_ALTERNATES)

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
  
    const [alternateCount, setAlternateCount] = useAtom(alternateCountAtom)
    const [minValue, setMinValue] = React.useState<number>(ONE_PERCENT)
    const [maxValue, setMaxValue] = React.useState<number>(ONE_HUNDRED_PERCENT)
    let stepSize = (maxValue-minValue)/alternateCount
    
    const [values, setValues] = React.useState([...handleInitValues(alternateCount, stepSize)])

    const updateMax = (updatedMax: number) => setMaxValue(Math.min(updatedMax, 1.00))
    const updateMin = (updatedMin: number) => setMinValue(Math.max(updatedMin, 0.00))

    const handleAlternateCountChange = (updatedAltCount: number) => {
        setAlternateCount(updatedAltCount)
        stepSize = (maxValue-minValue)/updatedAltCount
        setValues([...handleInitValues(updatedAltCount, stepSize)]);
    }

    return (
        <Toolbar>
            <NumberField
                label='Alternates'
                value={alternateCount}
                onChange={handleAlternateCountChange}
                minValue={MIN_ALTERNATES}
                maxValue={MAX_ALTERNATES}
            />
            <ToolbarSeparator /> 
            <RangeSlider
                id={`Alt-Url-Split-for-${alternateCount}-for-${maxValue}-to-${minValue}`}
                label={`Alternate-URLs`}
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[...values]}
                values={values}
                step={0.01}
            />
        </Toolbar>
    );
}

function isValidURL(urlInput: string) {
    var res = urlInput.match(VALID_URL_REGEX);
    return (res !== null);
}

const AlternateUrlConfig = ({ id }: { id: number; }) => {
    const [value, setValue] = React.useState<string>('')
    const [isValid, setIsValid] = React.useState<boolean>(true)
    
    const handleChange = (updatedValue: string) => {
        setValue(updatedValue)
        setIsValid(isValidURL(updatedValue))
    }

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}>
            <TextField
                label='Alternate URL'
                placeholder='www.alternate.com'
                value={value}
                onChange={handleChange}
                isValid={isValid}
            />
        </Flex>
    )
}

export const AbTestingTab = () => {

    return (
        <AbTestingContainer>
            <Controller />
            <AbTestingGroup /> 
        </AbTestingContainer>
    )
}
