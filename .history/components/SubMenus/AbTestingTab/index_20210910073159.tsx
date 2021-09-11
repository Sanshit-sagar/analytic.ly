import React from 'react'

import { styled } from '../../../stitches.config'

import { Toolbar, ToolbarSeparator } from '../../../primitives/Toolbar'
import { Flex } from '../../../primitives/Flex'

import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'
import { TextField } from '../../../compositions/TextField'

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
    const [altCount, setAltCount] = React.useState(2)

    return (
        <Toolbar>
            <NumberField
                label='Alternates'
                value={altCount}
                onChange={(updatedAltCount: number) => setAltCount(updatedAltCount)}
                minValue={2}
                maxValue={5}
            />
            <ToolbarSeparator /> 
            <RangeSlider
                label="Audience Split"
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[0.33, 0.66]}
                step={0.01}
            />
        </Toolbar>
    );
}

export const VALID_URL_REGEX: string = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/


const validate = (unvalidatedText: string, validationRegex: string) => {
    unvalidatedText.match(validationRegex)
}

const ConfigDetails = () => {
    const [value, setValue] = React.useState<string>('')
    const [isValid, setIsValid] = React.useState<boolean>(true)
    
    const handleChange = (updatedValue: string) => {
        setValue(updatedValue)
        setIsValid(validate(updatedValue, VALID_URL_REGEX)VALID_URL_REGEX)
    }

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}>
            <TextField
                label='Email'
                placeholder='abc@example.com'
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
            <ConfigDetails /> 
        </AbTestingContainer>
    )
}

export default AbTestingTab