import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import {
    fromMonth, 
    toMonth,
    hoveredStartDateAtom,
    fromMonthAtom,
    fromYearAtom,
    fromDateAtom,
    setFromDateAtom
} from '../../../atoms/expiration'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import SelectMenu from '../../../compositions/SelectMenu'
import { IconButton } from '../../../primitives/IconButton'

import { StarIcon, GearIcon } from '@radix-ui/react-icons'
import { I18nProvider, useDateFormatter } from '@react-aria/i18n'

import { DateUtils } from 'react-day-picker'
import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css"

import { Navbar } from './Navbar'
import { YearMonthSelectors } from './Selectors'
import { useGloballyConsistentColors } from '../../../hooks/useColors'


const StyledExpirationTab = styled('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    jc: 'space-between',
    ai: 'cent'
});

const StyledCalendarContainer = styled(Box, {
    width: '400px',
    height: '400px',
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
    height: '35px',
    width: '35px',
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
})

export const FmtDate = ({ date, fallback }) => {
    let formatter = useDateFormatter();

    try {
        return (
            <Text size='$6' css={{ color: '$funkyText' }}> 
                {formatter.format(new Date(date))} 
            </Text>
        );
    } catch(error) {
        return (
            <Text size='$6' css={{ color: '$funkyText' }}> 
                {formatter.format(new Date(fallback))} 
            </Text>
        )
    }
}

const renderDay = (day) => {
    const date = day.getDate()

    return (
        <StyledCell id={`cell-for-date-${date}`}>
            <StyledDate>
                {date}
            </StyledDate>
        </StyledCell>
    );
}

interface ICalendarProps {
    to: Date | undefined | null;
    from: Date | undefined | null;
    month: Date | undefined | null;
    enteredTo: Date | undefined | null;
    hoveredStartDate: Date | undefined | null;
    handleYearMonthChange: ;
    handleHoveredStartDateChange: ;
    handleEnteredToChange: ;
    handleToChange: ;
    
}

export const Calendar = ({ 
    to, 
    from, 
    month, 
    enteredTo, 
    hoveredStartDate, 
    handleYearMonthChange, 
    handleHoveredStartDateChange, 
    handleEnteredToChange,   
    handleToChange, 
    handleFromChange
}: ICalendarProps) => {
  
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
        if(from && to) return; 
        if(!isSelectingFirstDay(from, to, day)) setEnteredTo(day)
        else setHoveredStartDate(day)
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
    const colors = useGloballyConsistentColors()


    const modifiersStyles = {
        outside: {
            backgroundColor: 'transparent',
        },
        selected: {
            border: 'thin solid',
            borderColor: colors.border,
            backgroundColor: 'transparent',
            color: colors.accent
        }
    }

    return (
        <StyledExpirationTab>

            <StyledCalendarContainer>
                <DayPicker 
                    month={month}
                    fromMonth={from}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    renderDay={renderDay}
                    selectedDays={selectedDays}
                    disabledDays={disabledDays}
                    onDayClick={handleDayClick}
                    onDayMouseEnter={handleDayMouseEnter}
                    navbarElement={<Navbar />}
                    captionElement={({ date, localeUtils }) => (
                        <YearMonthSelectors
                            date={date}
                            fromMonth={fromMonth}
                            toMonth={toMonth}
                            localeUtils={localeUtils}
                            onChange={handleYearMonthChange}
                        />
                    )}
                />
            </StyledCalendarContainer> 

            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
                <FmtDate date={new Date(hoveredStartDate)} fallback={new Date(from)}/> 
                <FmtDate date={new Date(enteredTo)} fallback={new Date(to)} /> 
            </Flex>   

        </StyledExpirationTab>    
    );
}
