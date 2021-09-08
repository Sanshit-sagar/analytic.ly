// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html
import React, { SetStateAction } from 'react'
import { styled } from '../../stitches.config'

import { atom, useAtom } from 'jotai'
import { focusAtom } from 'jotai/optics'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css";

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

const renderDay = (day: Date) => {
    const date = day.getDate();

    return (
        <StyledCell>
            <StyledDate>
                {date}
            </StyledDate>
        </StyledCell>
    );
}
type RangeEndpointType = Date | null | undefined;
type SelectedEndpointType = 'from' | 'to' | 'none'

interface IRange {
    from: RangeEndpointType;
    to: RangeEndpointType;
}

const INIT_STATE: IRange = { from: undefined, to: undefined };

const slugRangeAtom = atom(INIT_STATE);
const slugRangeStartAtom = focusAtom(slugRangeAtom, (optic) => optic.prop('from'))
const slugRangeEndAtom = focusAtom(slugRangeAtom, (optic) => optic.prop('to'))

const selectedAtom = atom<SelectedEndpointType>('none')
const selectedEndpointAtom = atom(
    (get) => get(selectedAtom),
    (_get, set, update: SetStateAction<SelectedEndpointType>) => set(selectedAtom, update)
);

const firstSelectedAtom = atom(false)

export const SelectableCalendar = () => {
    const setRangeStart = useUpdateAtom(slugRangeStartAtom)
    const setRangeEnd = useUpdateAtom(slugRangeEndAtom)

    const [firstSelected, setFirstSelected] = useAtom(firstSelectedAtom)
    const [selectedEndpoint, setSelectedEndpoint] = useAtom(selectedEndpointAtom)

    const handleDayClick = (day: Date | undefined | null) => {
        alert('HERE!!')

        setSelectedEndpoint(firstSelected ? 'to' : 'from')
        if(!firstSelected) setFirstSelected(true)

        if(selectedEndpoint==='from'){
            setRangeStart(day)
        } else {
            setRangeEnd(day)
        }
    }

    return (

        <StyledCalendarContainer>
            <DayPicker 
                className="SlugLifetimeSelector"
                renderDay={renderDay}
                dayPickerProps={{
                    numberOfMonths: 1,
                    fromMonth: new Date().getMonth(),
                    onDayClick: handleDayClick,
                }}
            />
        </StyledCalendarContainer>
    );
}

export const ExpirationTabContent = () => {
    const rangeStart = useAtomValue(slugRangeStartAtom)
    const rangeEnd= useAtomValue(slugRangeEndAtom)

    return (
        <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1'}}>
            <SelectableCalendar />
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-end', gap: '$2' }}>
                <Text> {rangeStart} </Text>
                <Text> {rangeEnd} </Text> 
            </Flex>
        </Flex>
    )
}

