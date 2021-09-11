import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Icon } from '../../primitives/Icon'
import { TextField } from '../../primitives/TextField'
import { CentralControlGroup, Label } from '../../primitives/FieldSet' 
import { useKeyboard } from '@react-aria/interactions'


import { useAtom, atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { 
    CheckCircledIcon, 
    CrossCircledIcon, 
    InfoCircledIcon 
} from '@radix-ui/react-icons'

export const VALID_URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export const destinationInputAtom = atom('')
export const isTypingDestinationAtom = atom(false)
export const isDestinationInputValidAtom = atom((get) => isValidURL(get(destinationInputAtom)))

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

const IsTypingDisplay = () => {
    const isTyping = useAtomValue(isTypingDestinationAtom)

    return <Text>{isTyping ? '...' : '' }</Text> 
}

export const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)
    const setIsTyping  = useUpdateAtom(isTypingDestinationAtom)
    let {keyboardProps} = useKeyboard({
        onKeyDown: (e) => setIsTyping(true),
        onKeyUp: (e) => setIsTyping(false),
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <CentralControlGroup>
            <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
                    <> Destination URL </>
                    <Icon label={'Destination URL'}>
                        <InfoCircledIcon />
                    </Icon>
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
            <IsTypingDisplay />
            <Validator />
        </CentralControlGroup>
    );
}



