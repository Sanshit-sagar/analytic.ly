import React, { useState } from 'react'
import { useKeyboard } from '@react-aria/interactions'

import { 
    CentralControlGroup as ControlGroup, 
    Label 
} from '../primitives/FieldSet'
import { TextField } from '../primitives/TextField'

import { InfoCircledIcon, GearIcon } from '@radix-ui/react-icons'

export const CustomTextField = () => {
    const [destinationInput, setDestinationInput] = useState('')
   

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <ControlGroup>
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
        </ControlGroup>
    );
}


