import React, { useState } from 'react'
import { useKeyboard } from '@react-aria/interactions'

import { 
    CentralControlGroup as ControlGroup, 
    Label,
    CheckCircledIcon,
    CrossCircledIcon
} from '../primitives/FieldSet'
import { TextField } from '../primitives/TextField'

import { InfoCircledIcon, GearIcon } from '@radix-ui/react-icons'



const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

function isValidURL(urlInput: string) {
    var res = urlInput.match(VALID_URL_REGEX);
    return (res !== null);
}

const ValidationIcon = () => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)
    return isDestValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}


const Validator = () => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)

    const validationColor = isDestValid ? 'green' : 'red'
    const validationResult = isDestValid ? VALID_RESULT : INVALID_RESULT

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>  
                <ValidationIcon />
                <> {validationResult} </>
            </Flex>
        </Text>
    );
}


export const CustomTextField = ({ destinationInputAtom, isDestinationInputValidAtom }) => {
    const [destinationInput, setDestinationInput] = useState(destinationInputAtom)

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
            <Validator />
        </ControlGroup>
    );
}


