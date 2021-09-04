import React, { useState, useEffect } from 'react'
import { Text } from '../../primitives/Text'

import { useAtom } from 'jotai'
import { atomWithReducer } from "jotai/utils";

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayModifiers } from 'react-day-picker/types/Modifiers'
import 'react-day-picker/lib/style.css'

const UNKNOWN_ACTION_TYPE_ERROR = 'Unable to reduce an unknown action type'
const NO_INPUT_ERROR = 'Please type or pick a day'
const INVALID_DAY_ERROR = 'This day is invalid'
const DISABLED_DAY_ERROR = 'This day is disabled'
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

interface IErrorOrSelectionProps  { 
    errorStr: string | undefined; 
    selectionStr: string | undefined;
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
            errors: action.payload.message || undefined
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



const ErrorOrSelection = ({ errorStr }: { errorStr: string }) => {
    if(!errorStr) return null; 
    
    return (
        <Text size='1' css={{ color: 'red' }}> 
            {errorStr}
        </Text> 
    );
}

const StartInput = () => {
    const [selectedDay, setSelectedDay] = useState(undefined)
    const [lifetime, dispatch] = useAtom(slugLifetimeReducerAtom)

    const handleDayChange = (updatedDay: Date, modifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
        setSelectedDay(updatedDay)
        const input = dayPickerInput.getInput()
        const isEmpty = !input.value.trim()
        const isDisabled = modifiers.disabled === true

        let mssg = isEmpty ? NO_INPUT_ERROR :  !selectedDay ?  INVALID_DAY_ERROR : isDisabled ? DISABLED_DAY_ERROR : undefined
        if(selectedDay && mssg===undefined) mssg = `{SELECTION_STR_PREFIX}: ${selectedDay.toLocaleDateString()}` 
    

        dispatch({ 
            type: 'assign', 
            payload: { 
                key: 'start', 
                value: updatedDay, 
                message: mssg || undefined,
            }
        });
    }

    return (
        <div style={{ width: '550px', backgroundColor: 'white' }}>
           
            <ErrorOrSelection 
                errorStr={errorStr} 
                selectionStr={selectionStr} 
            />
        
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

export const ExpirationTabContent = () => <StartInput />

