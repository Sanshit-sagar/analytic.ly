import React, { useState } from 'react'
import { useKeyboard } from '@react-aria/interactions'

import { 
    CentralControlGroup as ControlGroup, 
    Label
} from '../primitives/FieldSet'
import { TextField } from '../primitives/TextField'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'

import { 
    InfoCircledIcon,
    CheckCircledIcon,
    CrossCircledIcon,
    GearIcon
} from '@radix-ui/react-icons'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

function isValidURL(urlInput: string) {
    var res = urlInput.match(VALID_URL_REGEX);
    return (res !== null);
}

const ValidationIcon = ({ isDestinationInputValidAtom }: ) => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)
    return isDestValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}


const Validator = ({ isDestinationInputValidAtom }) => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)

    const validationColor = isDestValid ? 'green' : 'red'
    const validationResult = isDestValid ? VALID_RESULT : INVALID_RESULT

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>  
                <ValidationIcon isDestinationInputValidAtom={isDestinationInputValidAtom} />
                <> {validationResult} </>
            </Flex>
        </Text>
    );
}
interface ICustomTextFieldProps {
    destinationInputAtom: Atom<string>;
    isDestinationInputValidAtom: Atom<boolean>;
    validationRegex: string;
}

export const CustomTextField = ({ destinationInputAtom, isDestinationInputValidAtom, validationRegex  }: ICustomTextFieldProps ) => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <ControlGroup>
            <Label css={{ color: '$text' }}> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                    <> Destination URL </>
                    <InfoCircledIcon />
                </Text>
            </Label>
            <TextField 
                size='1' 
                type='url'
                value={destinationInput} 
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
            <Validator isDestinationInputValidAtom={isDestinationInputValidAtom} validationRegex={VALID_URL_REGEX} />
        </ControlGroup>
    );
}


