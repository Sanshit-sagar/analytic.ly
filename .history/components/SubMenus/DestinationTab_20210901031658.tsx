import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Separator } from '../../primitives/Separator'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'

import { useAtom, atom } from 'jotai'

const destinationInputAtom = atom('https://')
const isDestinationInputValidAtom = atom((get) => VALID_URL_REGEX.test(get(destinationInputAtom)))

export const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)
    const [isDestValid] = useAtom(isDestinationInputValidAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2'>
                Paste or Type the URL that you'd like to slugify   
            </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> Destination URL {isDestValid ? 'VALID' : 'NAH</Label>
                <TextField 
                    size='1' 
                    type='url'
                    value={destinationInput} 
                    onChange={handleInputChange} 
                    placeholder='www.example.com'
                    css={{ width: '100%' }}
                />
            </UrlFieldSet>
        </Flex>
    );
}



