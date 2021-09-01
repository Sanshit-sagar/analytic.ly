import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Separator } from '../../primitives/Heading'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'


export const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2'>
                 Enter the Destination URL below 
            </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> DestinationURL </Label>
                <TextField 
                    size='2' 
                    type='url'
                    variant='ghost' 
                    value={destinationInput} 
                    onChange={handleInputChange} 
                    placeholder='www.example.com'
                    css={{ width: '100%' }}
                />
            </UrlFieldSet>
        </Flex>
    );
}



