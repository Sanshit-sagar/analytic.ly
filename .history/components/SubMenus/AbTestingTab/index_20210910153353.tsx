import React from 'react'

import { styled } from '../../../stitches.config'

import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'
import { Toolbar, ToolbarSeparator } from '../../../primitives/Toolbar'

import { RangeSlider } from '../../../compositions/Slider'
import { TextField } from '../../../compositions/TextField'
import { NumberField } from '../../../compositions/NumberField'

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

const Controller = () => {
    const [alternateCount, setAlternateCount] = React.useState(2)
    const [updatedVal, setUpdatedVal] = React.useState(0)

    let [values, setValues] = React.useState([...Array(alternateCount)].map((val, i) => i))

    const useEffect(() => {
        if(alternateCount < values.length) {
            setValues(values.slice(0, alternateCount));
        } else if(alternateCount > values.length) {
            setValues([
                ...values, 
                ...Array(Math.abs(alternateCount - values.length)).map((_, i) => i)
            ]);
        }
    })

    return (
        <Toolbar>
            <NumberField
                label='Alternates'
                value={altCount}
                onChange={(updatedAltCount: number) => setAlternateCount(updatedAltCount)}
                minValue={2}
                maxValue={5}
            />
            <ToolbarSeparator /> 
            <RangeSlider
                label="Audience Split"
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                values={values}
                onChange={(value: number) => setUpdatedVal(value)}
                step={0.01}
            />
        </Toolbar>
    );
}

export const VALID_URL_REGEX: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/


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