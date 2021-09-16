import React, { useState } from 'react'
import { styled } from '../../stitches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { I18nProvider, useDateFormatter } from '@react-aria/i18n'
import SelectMenu from '../../compositions/SelectMenu'
import { IconButton } from '../../../primitives/IconButton'

import { 
    StarIcon, 
    GearIcon
} from '@radix-ui/react-icons'

import { DateUtils } from 'react-day-picker'
import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css"

const StyledCalendarContainer = styled(Box, {
    width: '375px',
    height: '375px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-start',
    ai: 'center',
    gap: '$1',
    margin: 0,
    mt: '$2',
    bc: 'transparent',
    border: '1px solid $border', 
    br: '$2',
    '&:hover': {
        border: '2px solid border3', 
        br: '$2'
    }
});


const StyledCell = styled('div', {
    position: 'relative',
    height: '30px',
    width: '30px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-end',
    gap: '$1',
    bc: 'transparent',
    border: '1px solid $border',
    br: '$1',
    padding: '$1',
    margin: 0,
    color: '$accent',
    '&:hover': {
        backgroundColor: '$accent',
        borderColor: '$border3',
        color: '$funky'
    }
});

const StyledDate = styled(Text, {
    color: 'inherit',
    size: '$2',
    fontWidth: 400,
    margin: '$1',
    '&:hover': {
        color: 'inherit'
    }
});

const MonthYearSelectors = styled('div', {
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$2',
    position: 'absolute',

})

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const fromMonth = new Date(currentYear, currentMonth)
const toMonth = new Date(currentYear + 1, currentMonth + 1)

export const monthAtom = atom(currentMonth)
export const yearAtom = atom(currentYear)
export const dateAtom = atom(
    (get) => new Date(get(yearAtom), get(monthAtom))
);
export const monthAtomsAtom = atom(
    (get) => get(dateAtom).getMonth(),
    (_get, set, update) => set(monthAtom, update)
);
export const yearAtomsAtom = atom(
    (get) => get(dateAtom).getFullYear(),
    (_get, set, update) => set(yearAtom, update)
)

const FmtDate = ({ date }) => {
    let formatter = useDateFormatter();
    return <Text> {formatter.format(new Date(date))} </Text>;
}


const renderDay = (day) => {
    const date = day.getDate();

    return (
        <StyledCell>
            <StyledDate>
                {date}
            </StyledDate>
        </StyledCell>
    );
}

const modifiersStyles = {
    birthday: {
        color: 'white',
        backgroundColor: 'yellow',
    },
    outside: {
        backgroundColor: 'white',
    },
    selected: {
        border: 'thin solid gray',
        borderRadius: '$2',
        backgroundColor: 'transparent',
        borderOpacity: 0.3
    }
};

export const ExpirationTabContent = () => {
    const [month, setMonth] = useState(fromMonth)
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [enteredTo, setEnteredTo] = useState(null)
    const handleYearMonthChange = (updatedMonth) => setMonth(updatedMonth) 

    function resetClick() {
        setFrom(null)
        setTo(null)
        setEnteredTo(null)
    }

    function updateState(updatedFrom = from, updatedTo = to, updatedEnteredTo = enteredTo) {
        setFrom(updatedFrom)
        setTo(updatedTo)
        setEnteredTo(updatedEnteredTo)
    }

    function isSelectingFirstDay(from, to, day) {
        const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
        const isRangeSelected = from && to
        return !from || isBeforeFirstDay || isRangeSelected
    }

    function handleDayClick(day) {
        if(from && to && day>=from && day<=to) {
            resetClick();
            return;
        }
        if(isSelectingFirstDay(from, to, day)) {
            updateState(day, null, null)
        } else {
            updateState(from, day, day);
        }
    }

    function handleDayMouseEnter(day) {
        if(!isSelectingFirstDay(from, to, day)) setEnteredTo(day)
    }

    function getRangeInMs(range) {
        try {
            intervalStart = new Date(parseInt(range[1].from)).getTime()
            intervalEnd = new Date(parseInt(range[1].to)).getTime()
            return intervalEnd - intervalStart
        } catch(error) {
            return 0; 
        }
    }

    const modifiers = { start: from, end: enteredTo }
    const disabledDays = { before: from }
    const selectedDays = [from, { from, to: enteredTo }]

    // let numSelectedMs = selectedDays && selectedDays?.length===2 ? getRangeInMs(selectedDays) : 0
    // let numSelectedDays = numSelectedMs ? (numSelectedMs / NUM_MSP_PER_DAY) : 0

    return (
        <StyledCalendarContainer>
            <DayPicker 
                month={month}
                fromMonth={from}
                modifiers={modifiers}
                // modifiersStyles={modifiersStyles}
                renderDay={renderDay}
                selectedDays={selectedDays}
                disabledDays={disabledDays}
                onDayClick={handleDayClick}
                onDayMouseEnter={handleDayMouseEnter}
                navbarElement={<Navbar />}
                captionElement={({ date, localeUtils }) => (
                    <YearMonthForm
                        date={date}
                        localeUtils={localeUtils}
                        onChange={handleYearMonthChange}
                    />
                )}
            />
        </StyledCalendarContainer>
    );
}