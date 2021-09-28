import React from 'react'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { TextField } from '../../../primitives/TextField'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'
import { Progress, ProgressIndicator } from '../../../primitives/Progress'

import { InfoCircledIcon } from '@radix-ui/react-icons'
import { passwordAtom, setMeterAndPasswordAtom } from '../../../atoms/password'

const meterValueAtom = atom(10)

// Your app...
export const ProgressDemo = ({ progress }: { progress: number }) => {
   

    return (
      <Progress value={progress}>
        <ProgressIndicator style={{ width: `${progress}%` }} />
      </Progress>
    );
};

  
export const SecurityTabContent = () => {
    const progress = useAtomValue(meterValueAtom)
    const passwordInput = useAtomValue(passwordAtom)
    const updatePassword = useUpdateAtom(setMeterAndPasswordAtom)

    const handleInputChange = (updatedInput: string) => {
        updatePassword(updatedInput)
    }

    return (
        <CentralControlGroup>
             <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
                    <> Encryption </>
                    <InfoCircledIcon />
                </Text>
            </Label>
            <ProgressDemo progress={progress} /> 
            <TextField 
                size='1' 
                type='password'
                value={passwordInput} 
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
        </CentralControlGroup>
    ); 
}