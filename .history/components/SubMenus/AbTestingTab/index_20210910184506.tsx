import React from 'react'

import { styled } from '../../../stitches.config'

import { Flex } from '../../../primitives/Flex'
import { Toolbar, ToolbarSeparator } from '../../../primitives/Toolbar'

import { RangeSlider } from '../../../compositions/Slider'
import { TextField } from '../../../compositions/TextField'
import { NumberField } from '../../../compositions/NumberField'


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

const handleInitValues = (alternateCount: number, stepSize: number): number[] => {
    let temp: number[] = [...Array(alternateCount)]; 
    temp[0] = 0
    for(let i = 1; i<=alternateCount; i++) temp[i] = {
        Math.round((temp[i-1] + stepSize) * 100)/100
    return temp
}

const Controller = () => {
    
    const [alternateCount, setAlternateCount] = React.useState(2)
    const [minValue, _] = React.useState<number>(0.01)
    const [maxValue, _] = React.useState<number>(1.00)
    let stepSize = (maxValue-minValue)/alternateCount
    
    const [values, setValues] = React.useState([...handleInitValues(alternateCount, stepSize)])

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
                minValue={2}
                maxValue={5}
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

const AlternateUrlConfig = () => {
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


const AbTestingTab = () => {

    return (
        <AbTestingContainer>
            <Controller />
            <AlternateUrlConfig />
        </AbTestingContainer>
    )
}

export default AbTestingTab