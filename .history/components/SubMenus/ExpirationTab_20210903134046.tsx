import React, { useState } from 'react'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import DayPickerInput from 'react-day-picker/DayPickerInput';

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
    selectedDay: Date; 
    isDisabled: boolean 
};

const DayPickerErrors = ({ isEmpty, selectedDay, isDisabled }: IDayPickerErrors) => {
    if(isEmpty) return <Text> Please type or pick a day </Text>
    if(!isEmpty && !selectedDay) return <Text> This day is invalid </Text>
    if(selectedDay & isDisabled) return <Text> This day is disabled </Text>
    if(selectedDay && !isDisabled) return <Text>  `You chose ${selectedDay.toLocaleDateString()}`</Text>
    return (
        {isEmpty && 'Please type or pick a day'}
        {!isEmpty && !selectedDay && 'This day is invalid'}
        {selectedDay && isDisabled && 'This day is disabled'}
        {selectedDay &&
          !isDisabled &&
          `You chose ${selectedDay.toLocaleDateString()}`}
    )
}

const StartInput = () => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const handleDayChange = (updatedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();

        setSelectedDay(updatedDay)
        setIsEmpty(!input.value.trim())
        setIsDisabled(modifiers.disabled === true)
    }

    return (
        <>
        <DayPickerErrors />
        <DayPickerInput
          overlayComponent={CustomOverlay}
          dayPickerProps={{
            todayButton: 'Today',
          }}
          keepFocus={false}
        />
        </>
    )
}