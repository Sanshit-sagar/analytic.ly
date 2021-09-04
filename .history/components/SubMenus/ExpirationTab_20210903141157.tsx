import React, { useState } from 'react'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayModifiers } from 'react-day-picker/types/Modifiers'

const getMillisInXMins = (x: number): number => 1000*60*x;  
const getTMinus1Min = new Date().getTime() - getMillisInXMins(1)
const getTPlus1Min = new Date().getTime() + getMillisInXMins(1)
const getDateAtTminus1min: Date = new Date(getTMinus1Min)
const getDateAtTplus1min: Date = new Date(getTPlus1Min)

export const newSlugTimeframeStartAtom = atom<Date>(getDateAtTminus1min)
export const newSlugTimeframeEndAtom = atom<Date>(getDateAtTplus1min)
export const newSlugTimeframeStartInMsAtom = atom<number>((get) => get(newSlugTimeframeStartAtom).getTime())
export const newSlugTimeframeEndInMsAtom = atom<number>((get) => get(newSlugTimeframeEndAtom).getTime())
export const newSlugTimeRange = atom<number>((get) =>get(newSlugTimeframeEndInMsAtom) - get(newSlugTimeframeStartInMsAtom))

export const ExpirationTabContent = () => {
    const [start, setStart] = useAtom(newSlugTimeframeStartAtom)
    const [end, setEnd] = useAtom(newSlugTimeframeEndAtom)

    return (
        <Flex css={{ ml: '100px', width: '100%', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$3'}}>
            {/* <Text>{start.toLocaleDateString()}</Text>  */}
            <StartInput />
            <Text>{end.toLocaleDateString()}</Text> 
        </Flex>
    )
}

interface IDayPickerErrors { 
    isEmpty: boolean;
    isDisabled: boolean;
    selectedDay: Date | undefined; 
};


const NO_INPUT_ERROR = 'Please type or pick a day'
const INVALID_DAY_ERROR = 'This day is invalid'
const DISABLED_DAY_ERROR = 'This day is disabled'
const SELECTION_STR_PREFIX = 'You chose'

const StartInput = () => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const [errorStr, setErrorStr] = useState<string | undefined>(undefined)
    const [selectionStr, setSelectionStr] = useState<string | undefined>(undefined)

    const updateSelectionStr = (sd: Date) => {
        setErrorStr(undefined)
        setSelectionStr(`${SELECTION_STR_PREFIX}: ${sd.toLocaleDateString()}`)
    }
    const updateErrorStr = (estr: string) => {
        setSelectionStr(undefined);
        setErrorStr(estr); 
    }
    const clearOuputs = () => {
        setSelectionStr(undefined)
        setErrorStr(undefined)
    }

    useEffect(() => {
        if(isEmpty) updateErrorStr(NO_INPUT_ERROR);
        else if(!isEmpty && !selectedDay) updateErrorStr(INVALID_DAY_ERROR)
        else if(selectedDay && isDisabled) updateErrorStr(DISABLED_DAY_ERROR)
        else if(selectedDay && !isDisabled) updateSelectionStr(selectedDay);
        else clearOuputs(undefined)
    }, [errorStr, isEmpty, isDisabled, selectedDay]);

    const handleDayChange = (updatedDay: Date, modifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
        const input = dayPickerInput.getInput();

        setSelectedDay(updatedDay)
        setIsEmpty(!input.value.trim())
        setIsDisabled(modifiers.disabled === true)
    }

    return (
        <div style={{ width: '550px', backgroundColor: 'white' }}>
            <Text size='1' css={{ color: '$text' }}
            <DayPickerInput 
                value={selectedDay} 
                onDayChange={handleDayChange} 
                dayPickerProps={{
                    selectedDays: selectedDay,
                    disabledDays: {
                        daysOfWeek: [0, 6],
                    },
                }}
            />
        </div>
    )
}