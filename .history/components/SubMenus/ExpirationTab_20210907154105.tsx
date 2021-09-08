import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import { atom, useAtom } from 'jotai'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayModifiers } from 'react-day-picker/types/Modifiers'
import 'react-day-picker/lib/style.css'

const NO_INPUT_ERR = 'Please type or pick a day'
const INVALID_DAY_ERR = 'This day is invalid'
const DISABLED_DAY_ERR = 'This day is disabled'

const timeframeStartAtom = atom(new Date())
const timeframeEndAtom = atom(new Date(new Date().getTime() + 1000*60*60*24))


const ErrorOrSelection = ({ errorStr }: { errorStr: string | undefined | null }) => {
    if(!errorStr) return null; 
    
    return (
        <Text size='1' css={{ color: 'red' }}> 
            {errorStr}
        </Text> 
    );
}

const DateInput = () => {
    const [expiration, setExpiration] = useAtom(timeframeEndAtom)

    const getError = (isEmpty: boolean, day: Date | undefined, isDisabled: boolean) => {
        return isEmpty ? NO_INPUT_ERR : !day ?  INVALID_DAY_ERR : isDisabled ? DISABLED_DAY_ERR : undefined;
    }

    const getFmtSelection = (ufmtDate: Date) => `Selection: ${ufmtDate.toLocaleDateString()}`

    const handleDayChange = (updatedDay: Date, modifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
        const input = dayPickerInput.getInput()
        const isEmpty = !input.value.trim()
        const isDisabled = modifiers.disabled === true
        const isValidInput = !isEmpty && !isDisabled && updatedDay
        const messageStr = isValidInput ? getFmtSelection(updatedDay) : getError(isEmpty, updatedDay, isDisabled)

        setExpiration(isValidInput ? updatedDay : undefined)
        setValidation(isValidInput ? messageStr : isEmpty ? 'EMPTY' : 'DISABLED')
    
    }

    return (
        <Box css={{ margin: 'auto', display: 'flex', border: 'thin solid', borderColor: '$border', borderRadius: '$2' }}>
            <DayPickerInput 
                value={selectedDay} 
                onDayChange={handleDayChange} 
                dayPickerProps={{
                    selectedDays: selectedDay,
                    disabledDays: {
                        daysOfWeek: [0, 7],
                    },
                }}
            />
        </Box>
    )
}

const StartDateControlGroup = () => {

    return <DateInput key={'START'} />
}

const EndDateControlGroup = () => {

    return <DateInput key={'END'} />
}

export const ExpirationTabContent = () => {

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$3', height: '100px' }}> 
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2', width: '250px' }}>
                <StartDateControlGroup />
                <EndDateControlGroup />
            </Flex>
            <ErrorOrSelection errorStr={lifetime.errors} />
        </Flex>
    );
} 

