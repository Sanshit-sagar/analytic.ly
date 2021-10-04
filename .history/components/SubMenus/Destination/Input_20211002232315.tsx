import React from 'react'

import { Text } from '../../../primitives/Text'
import { TextField } from '../../../primitives/TextField'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet' 

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    CheckCircledIcon, 
    CrossCircledIcon, 
    InfoCircledIcon 
} from '@radix-ui/react-icons'

import { 
    isDestinationInputValidAtom, 
    destinationInputAtom
} from '../../../atoms/destination'

const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

const ValidationIcon = () => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)
    return isDestValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}

const Validator = () => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)

    const validationColor = isDestValid ? 'green' : 'red'
    const validationResult = isDestValid ? VALID_RESULT : INVALID_RESULT

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1', display: 'flex', fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>
            <> <ValidationIcon /> </>
            <> {validationResult} </>
        </Text>
    );
}

export const DestinationUrlInput = () => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <CentralControlGroup>
            <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
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
            <Validator />
        </CentralControlGroup>
    );
}



