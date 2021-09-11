import React, { useState } from 'react'
import { useKeyboard } from '@react-aria/interactions'

import { CentralControlGroup, Label } from '../primitives/FieldSet'
import { TextField } from '../primitives/TextField'

import { InfoCircledIcon } from '@radix-ui/react-icons'

export const TextField = () => {
    const [destinationInput, setDestinationInput] = useState(destinationInputAtom)
   

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <CentralControlGroup>
            <Label css={{ color: '$text' }}> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '
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


