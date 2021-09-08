import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { ControlGroup, Label } from '../../primitives/FieldSet'

import { useAtom } from 'jotai'
import { atomWithReducer } from "jotai/utils";

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayModifiers } from 'react-day-picker/types/Modifiers'
import 'react-day-picker/lib/style.css'



const NO_INPUT_ERR = 'Please type or pick a day'
const INVALID_DAY_ERR = 'This day is invalid'
const DISABLED_DAY_ERR = 'This day is disabled'



const ErrorOrSelection = ({ errorStr }: { errorStr: string | undefined | null }) => {
    if(!errorStr) return null; 
    
    return (
        <Text size='1' css={{ color: 'red' }}> 
            {errorStr}
        </Text> 
    );
}

const DateInput = ({ key }: { key: string }) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [_, dispatch] = useAtom(slugLifetimeReducerAtom)

    const getError = (isEmpty: boolean, day: Date | undefined, isDisabled: boolean) => {
        return isEmpty ? NO_INPUT_ERR : !day ?  INVALID_DAY_ERR : isDisabled ? DISABLED_DAY_ERR : undefined;
    }

    const getFmtSelection = (ufmtDate: Date) => `You chose: ${ufmtDate.toLocaleDateString()}`

    const handleDayChange = (updatedDay: Date, modifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
        alert(`Key is ${key}`)

        const input = dayPickerInput.getInput()
        const isEmpty = !input.value.trim()
        const isDisabled = modifiers.disabled === true
        const isValidInput = !isEmpty && !isDisabled && updatedDay
        const messageStr = isValidInput ? getFmtSelection(updatedDay) : getError(isEmpty, updatedDay, isDisabled)

        setSelectedDay(isValidInput ? updatedDay : undefined)
        dispatch({ 
            type: 'assign', 
            payload: { 
                key: `Start`, 
                value: selectedDay, 
                errors: messageStr
            }
        });
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
    const [lifetime, _] = useAtom(slugLifetimeReducerAtom)

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

