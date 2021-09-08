import React from 'react'

import { Text } from '../../primitives/Text'
import { CentralControlGroup, Label } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'
// import { OpenGraphPreview } from './OpenGraphPreview'

import { useAtom, atom } from 'jotai'

const VALID_URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export const destinationInputAtom = atom('')
export const isDestinationInputValidAtom = atom((get) => isValidURL(get(destinationInputAtom)))

const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

function isValidURL(urlInput: string) {
    var res = urlInput.match(VALID_URL_REGEX);
    return (res !== null);
}


const Validator = () => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)

    const validationResult = isDestValid ? VALID_RESULT : INVALID_RESULT
    const color =
}

export const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)
   

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <CentralControlGroup>
            <Label css={{ color: '$text', mt: '$2' }}> 
                <Text size='1' css={{ color: '$text' }}>
                    Destination URL
                </Text>
            </Label>
            <TextField 
                size='1' 
                type='url'
                value={destinationInput} 
                onChange={handleInputChange} 
                placeholder='www.example.com'
                css={{
                    border: 'thin solid',
                    padding: '$2',
                    mt: '$2'
                }}
            /> 
            <Validator />
        </CentralControlGroup>
    );
}



