import React from 'react'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { TextField } from '../../../primitives/TextField'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'
import { Progress, ProgressIndicator } from '../../../primitives/Progress'

import { InfoCircledIcon } from '@radix-ui/react-icons'
import { 
    passwordAtom, 
    setMeterAndPasswordAtom, 
    meterPercentageAtom, 
    meterColorAtom 
} from '../../../atoms/password'

const meterValueAtom = atom(10)

// Your app...
export const ProgressDemo = ({ progress }: { progress: number }) => (
    <Progress value={progress}>
        <ProgressIndicator style={{ width: `${progress}%` }} />
    </Progress>
);

  
export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)
    const meterPct = useAtomValue(meterPercentageAtom)
    const meterColor = useAtomValue(meterColorAtom)

    const password = useAtomValue(passwordAtom)
    const setMeterAndPassword = useUpdateAtom(setMeterAndPasswordAtom)

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMeterAndPassword(event.currentTarget.value)
    }
   


    return (
        <>
        <CentralControlGroup>
             <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
                    <> Encryption {meterPct} {meterColor} {meterValue} </>
                    <InfoCircledIcon />
                </Text>
            </Label>
            <ProgressDemo progress={meterPct} /> 
            <TextField 
                size='1' 
                type='password'
                value={password} 
                onChange={updatePassword} 
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
        <SubmissionUrl /> 
        </>
    ); 
}