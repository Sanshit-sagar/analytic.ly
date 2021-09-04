import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useAtom } from 'jotai'
import { atomWithReducer } from "jotai/utils";

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayModifiers } from 'react-day-picker/types/Modifiers'
import 'react-day-picker/lib/style.css'

const UNKNOWN_ACTION_TYPE_ERROR = 'Unable to reduce an unknown action type'
const NO_INPUT_ERR = 'Please type or pick a day'
const INVALID_DAY_ERR = 'This day is invalid'
const DISABLED_DAY_ERR = 'This day is disabled'
const SELECTION_STR_PREFIX = 'You chose'

const INIT_SLUG_LIFETIME = { 
    start: undefined, 
    end: undefined, 
    difference: undefined, 
    errors: undefined
}

type ActionTypeType = 'assign' | 'clear'

interface IAction {
    type: ActionTypeType;
    payload: { key: string; value: any | undefined; message: string | undefined };
}

interface ISlugLifetime {
    start: Date | undefined;
    end: Date | undefined;
    difference: number | undefined;
    errors: string | undefined;
}


const reducer = (prev: ISlugLifetime, action: IAction) => {
    if(action.type==='assign') {
        return {
            ...prev,
            [action.payload.key]: action.payload.value || undefined,
            errors: `${prev.errors || ''} + `action.payload.message || undefined
        };
    } else if(action.type==='clear') {
        return {
            ...prev,
            [action.payload.key]: undefined,
            errors: undefined,
        };
    } else {
        throw new Error(UNKNOWN_ACTION_TYPE_ERROR)
    }
}

const slugLifetimeReducerAtom = atomWithReducer(INIT_SLUG_LIFETIME, reducer);


const ErrorOrSelection = ({ errorStr }: { errorStr: string | undefined | null }) => {
    if(!errorStr) return null; 
    
    return (
        <Text size='1' css={{ color: 'red' }}> 
            {errorStr}
        </Text> 
    );
}

const DateInput = ({ key }) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [_, dispatch] = useAtom(slugLifetimeReducerAtom)

    const handleDayChange = (updatedDay: Date, modifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
       
        const input = dayPickerInput.getInput()
        const isEmpty = !input.value.trim()
        const isDisabled = modifiers.disabled === true
        
        let messageStr: string | undefined = undefined
        if(!isEmpty && !isDisabled && updatedDay) {
            setSelectedDay(updatedDay)
            messageStr = `${key}: ${updatedDay.toLocaleDateString()}` 
        } else {
            setSelectedDay(undefined)
            messageStr = isEmpty ? NO_INPUT_ERR : !selectedDay ?  INVALID_DAY_ERR : isDisabled ? DISABLED_DAY_ERR : undefined
        }

        dispatch({ 
            type: 'assign', 
            payload: { 
                key: key, 
                value: selectedDay, 
                message: messageStr || undefined,
            }
        });
    }

    return (
        <div style={{ width: '550px', backgroundColor: 'white' }}>
            <DayPickerInput 
                value={selectedDay} 
                onDayChange={handleDayChange} 
                dayPickerProps={{
                    selectedDays: selectedDay,
                    disabledDays: {
                        daysOfWeek: [0, 4],
                    },
                }}
            />
        </div>
    )
}

export const ExpirationTabContent = () => {
    const [lifetime, _] = useAtom(slugLifetimeReducerAtom)

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$3', height: '100px' }}> 
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2', width: '250px' }}>
                 <DateInput key='start' />
                 <DateInput key='end' />
            </Flex>
            <ErrorOrSelection errorStr={lifetime.errors} />

            <button onClick={() => alert(`${JSON.stringify(lifetime)}`)}> 
                show
            </button>
        </Flex>
    );
} 

