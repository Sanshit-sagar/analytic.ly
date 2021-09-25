import React from 'react'
import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils' 

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { TextField } from '../../../primitives/TextField'

import { 
    CentralControlGroup, 
    Label 
} from '../../../primitives/FieldSet'

import {
    CheckCircledIcon,
    CrossCircledIcon,
    InfoCircledIcon
} from '@radix-ui/react-icons'

export const VALID_URL_REGEX: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export const VALID_RESULT = 'Sweet, that looks good!'
export const INVALID_RESULT = 'Uh oh, not quite there yet :('
export const VALID_COLOR = 'green' 
export const INVALID_COLOR = 'red'

const abTestingInputAtom = atom('')
const abTestingAtom = atom(
    (get) => get(abTestingInputAtom),
    (_get, set, updatedInput: React.SetStateAction<string>) => set(abTestingInputAtom, updatedInput)
);
const isAbTestingInputValidAtom = atom((get) => get(abTestingAtom).match(VALID_URL_REGEX) !== null)


const ValidationIcon = () => {
    const isInputValid = useAtomValue(isAbTestingInputValidAtom)
    return isInputValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}

const Validator = () => {
    const isInputValid = useAtomValue(isAbTestingInputValidAtom)

    const validationColor = isInputValid ? VALID_COLOR : INVALID_COLOR
    const validationResult = isInputValid ? VALID_RESULT : INVALID_RESULT

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$1' }}>
                <ValidationIcon />
                <> {validationResult} </>
            </Flex>
        </Text>
    );
}

export const AbTestingGroup = () => {
    const [input, setInput] = useAtom(abTestingAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
    }

    return (
        <CentralControlGroup>
            <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', gap: '$1' }}>
                    <> Alternate URL </>
                    <InfoCircledIcon />
                </Text>
            </Label>
            <TextField 
                size='1' 
                type='url'
                value={input} 
                onChange={handleInputChange} 
                placeholder='www.example.com'
                css={{
                    backgroundColor: '$accentDulled',
                    border: 'thin solid $border',
                    padding: '$2',
                    mt: '$2',
                    '&:hover': {
                        borderColor: '$neutral'
                    }
                }}
            /> 
            <Validator />
        </CentralControlGroup>
    );
}

