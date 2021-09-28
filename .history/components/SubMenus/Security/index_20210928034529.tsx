import React, { useState } from 'react'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
// import { Meter } from '../../../compositions/Meter'

import { Text } from '../../../primitives/Text'
import { TextField } from '../../../primitives/TextField'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'
import { Progress, ProgressIndicator } from '../../../primitives/Progress'

import { InfoCircledIcon } from '@radix-ui/react-icons'
import { passwordInput, setMeterAndPasswordAtom } from '../../../atoms/password'

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
    const meterValue = useAtomValue(meterValueAtom)
    const passwordInput, setPasswordInput = useAtom(passwordInput)
    const updatePassword

    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        setTimeout(() => setProgress(8), 300)
    }, [])

    const updateProgress = (updatedProgress: number) => setProgress(updatedProgress)

    const [passwordInput, setPasswordInput] = useState('')
    const handleInputChange = (updatedInput: string) => {
        setPasswordInput(updatedInput)
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
                type='url'
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