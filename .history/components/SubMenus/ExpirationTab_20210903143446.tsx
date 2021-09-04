import React, { useState, useEffect } from 'react'
import { Text } from '../../primitives/Text'

// import { atom } from 'jotai'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayModifiers } from 'react-day-picker/types/Modifiers'
import 'react-day-picker/lib/style.css';

// const getMillisInXMins = (x: number): number => 1000*60*x;  
// const getTMinus1Min = new Date().getTime() - getMillisInXMins(1)
// const getTPlus1Min = new Date().getTime() + getMillisInXMins(1)
// const getDateAtTminus1min: Date = new Date(getTMinus1Min)
// const getDateAtTplus1min: Date = new Date(getTPlus1Min)
// 
// export const newSlugTimeframeStartAtom = atom<Date>(getDateAtTminus1min)
// export const newSlugTimeframeEndAtom = atom<Date>(getDateAtTplus1min)
// export const newSlugTimeframeStartInMsAtom = atom<number>((get) => get(newSlugTimeframeStartAtom).getTime())
// export const newSlugTimeframeEndInMsAtom = atom<number>((get) => get(newSlugTimeframeEndAtom).getTime())
// export const newSlugTimeRange = atom<number>((get) => get(newSlugTimeframeEndInMsAtom) - get(newSlugTimeframeStartInMsAtom)) 
interface ISlugLifetimeInput {
    start: Date;
    end: Date;
    difference: number;
    errors: IErrorOrSelectionProps
}
const slugLifetimeInputAtom = atom(})

interface IErrorOrSelectionProps  { 
    errorStr: string | undefined; 
    selectionStr: string | undefined;
}

const NO_INPUT_ERROR = 'Please type or pick a day'
const INVALID_DAY_ERROR = 'This day is invalid'
const DISABLED_DAY_ERROR = 'This day is disabled'
const SELECTION_STR_PREFIX = 'You chose'

const ErrorOrSelection = ({ errorStr, selectionStr }: IErrorOrSelectionProps) => {
    if(!errorStr && !selectionStr) return null; 
    
    return (
        <Text size='1' css={{ color: '$text' }}> 
            {errorStr ? errorStr : selectionStr} 
        </Text> 
    );
}

const StartInput = () => {
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

        setSelectedDay(updatedDay)
        setIsEmpty(!input.value.trim())
        setIsDisabled(modifiers.disabled === true)
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

