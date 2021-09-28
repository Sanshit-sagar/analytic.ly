import React from 'react'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { TextField } from '../../../primitives/TextField'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'
import { 
    Progress, 
    ProgressIndicator,
    StatusText,
    ProgressText
} from '../../../primitives/Progress'

import { InfoCircledIcon } from '@radix-ui/react-icons'
import { 
    passwordAtom, 
    setMeterAndPasswordAtom, 
    meterPercentageAtom, 
} from '../../../atoms/password'

import { Separator } from '../../../primitives/Separator'

// const meterValueAtom = atom(10)

export const ProgressDemo = ({ progress }: { progress: number }) => (
    <Progress value={progress}>
        <ProgressIndicator style={{ width: `${progress}%` }} />
    </Progress>
)

export const ProgressStatus = () => {
    const meterPct = useAtomValue(meterPercentageAtom)
    return <StatusText progress={meterPct} />
}

export const ProgressPercentage = () => {
    const meterPct = useAtomValue(meterPercentageAtom)
    return <ProgressText progress={meterPct} />
}

export const ProgressBar = () => {
    const meterPct = useAtomValue(meterPercentageAtom)
    return <ProgressDemo progress={meterPct} />;
}

const Header = () => (
    <Label> 
        <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
            Encryption <InfoCircledIcon />
        </Text>
    </Label>
)

export const Labels = () => (
    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center' }}>
        <ProgressStatus />
        <ProgressPercentage /> 
    </Flex> 
)

const Input = () => {
    const password = useAtomValue(passwordAtom)
    const setMeterAndPassword = useUpdateAtom(setMeterAndPasswordAtom)

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMeterAndPassword(event.currentTarget.value)
    }

    return (
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
                },
                fontSize: 32
            }}
        /> 
    ); 
}
  
export const SecurityTabContent = () => (
    <CentralControlGroup>
        <Header /> 
        <Separator /> 
        <Labels /> 
        <ProgressBar />  
        <Input /> 
    </CentralControlGroup>

)