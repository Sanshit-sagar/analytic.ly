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

const DayPickerErrors = ({ isEmpty,isDisabled, selectedDay }: IDayPickerErrors) => {
   
   
   
   
    return null;
}

const NO_INPUT_ERROR = 'Please type or pick a day'
const INVALID_DAY_ERROR = 'This day is invalid'
const DISABLED_DAY_ERROR = 'This day is disabled'
const SELECTION_PREFIX

const StartInput = () => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const [errorStr, setErrorStr] = useState<string | undefined>(undefined)
    const [selectionStr, setSelectionStr] = useState<string | undefined>(undefined)

    useEffect(() => {
        if(isEmpty) setErrorStr(NO_INPUT);
        else if(!isEmpty && !selectedDay) setErrorStr(INVALID_DAY_ERROR)
        if(selectedDay && isDisabled) setErrorStr(DISABLED_DAY_ERROR)
        if(selectedDay && !isDisabled) {
            
            setSelectionStr(`You chose ${selectedDay.toLocaleDateString()}`)
        }
    }, [errorStr, isEmpty, isDisabled, selectedDay])

    const handleDayChange = (updatedDay: Date, modifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
        const input = dayPickerInput.getInput();

        setSelectedDay(updatedDay)
        setIsEmpty(!input.value.trim())
        setIsDisabled(modifiers.disabled === true)
    }

    return (
        <div style={{ width: '550px', backgroundColor: 'white' }}>
            <DayPickerErrors 
                isEmpty={isEmpty}
                isDisabled={isDisabled}
                selectedDay={selectedDay}
            />
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