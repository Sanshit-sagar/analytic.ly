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
    payload: { key: string; value: any | undefined; };
}

interface IErrorOrSelectionProps  { 
    errorStr: string | undefined; 
    selectionStr: string | undefined;
}

interface ISlugLifetime {
    start: Date | undefined;
    end: Date | undefined;
    difference: number | undefined;
    errors: IErrorOrSelectionProps | undefined;
}


const reducer = (prev: ISlugLifetime, action: IAction) => {
    if(action.type==='assign') {
        return {
            ...prev,
            [action.payload.key]: action.payload.value || undefined,
        };
    } else if(action.type==='clear') {
        return {
            ...prev,
            [action.payload.key]: undefined,
        };
    } else {
        throw new Error(UNKNOWN_ACTION_TYPE_ERROR)
    }
}

const slugLifetimeReducerAtom = atomWithReducer(INIT_SLUG_LIFETIME, reducer);



const ErrorOrSelection = ({ errorStr, selectionStr }: IErrorOrSelectionProps) => {
    if(!errorStr && !selectionStr) return null; 
    
    return (
        <Text size='1' css={{ color: '$text' }}> 
            {errorStr ? errorStr : selectionStr} 
        </Text> 
    );
}

const StartInput = () => {
    const [lifetime, dispatch] = useAtom(slugLifetimeReducerAtom)

    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const [errorStr, setErrorStr] = useState<string | undefined>(undefined)
    const [selectionStr, setSelectionStr] = useState<string | undefined>(undefined)

    const clearOutputs = () => {
        setSelectionStr(undefined)
        setErrorStr(undefined)
    }

    useEffect(() => {
        clearOutputs();
        if(isEmpty) setErrorStr(NO_INPUT_ERROR);
        else if(!isEmpty && !selectedDay) setErrorStr(INVALID_DAY_ERROR)
        else if(selectedDay && isDisabled) setErrorStr(DISABLED_DAY_ERROR)
        else if(selectedDay && !isDisabled) setSelectionStr(`${SELECTION_STR_PREFIX}: ${selectedDay.toLocaleDateString()}`)

    }, [errorStr, isEmpty, isDisabled, selectedDay]);

    const handleDayChange = (updatedDay: Date, modifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
        const input = dayPickerInput.getInput();

        const isEmpty = !input.value.trim();
        co
        setIsDisabled(modifiers.disabled === true)

        dispatch({ type: 'assign', payload: { key: 'start', value: updatedDay }});
        dispatch({ 
            type: 'check_emptiness', 
            payload: { 
                key: 'errors', 
                value: isEmpty ? NO_INPUT_ERROR : !selectedDay ? INVALID_DAY_ERROR : isDisabled ? DISABLED_DAY_ERROR : '',
            }
        })
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

