import React from 'react'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { IconButton } from '../../../primitives/IconButton'
import { TextField } from '../../../primitives/TextField'
import { Separator } from '../../../primitives/Separator'
import { 
    Label,
    CentralControlGroup
} from '../../../primitives/FieldSet'

import { 
    StatusText,
    Progress, 
    ProgressText,
    ProgressIndicator
} from '../../../primitives/Progress'

import { 
    passwordAtom, 
    setMeterAndPasswordAtom, 
    meterPercentageAtom, 
} from '../../../atoms/password'

import { InfoCircledIcon, EyeOpenIcon } from '@radix-ui/react-icons'

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
        <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3', mb: '$1' }}>
            Encryption <InfoCircledIcon />
        </Text>
    </Label>
)

export const Labels = () => (
    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center', mt: '$4' }}>
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
        <Flex c
            css={{
                fd: 'row',
                jc: 'space-between',
                ai: 'stretch'
                bc: '$accentDulled',
                p: '$1',
                mt: '$2',
                border: 'thin solid $border',
                '&:hover': {
                    borderColor: '$neutral'
                },
            }}
        >
            <TextField 
                size='1' 
                type='password'
                value={password} 
                onChange={updatePassword} 
                placeholder=''
                css={{
                    fontSize: 32
                }}
            /> 
            <>
            <IconButton size='1' variant='ghost'>
                <EyeOpenIcon /> 
            </IconButton>
            <Text size='$4'> {xx/xx} </Text>
        </Flex>
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