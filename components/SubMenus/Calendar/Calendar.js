import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import {
    toAtom,
    fromAtom, 
    toMonth,
    fromMonth,
    stageAtom,
    activePageAtom,
    hoveredEndDateAtom,
    hoveredStartDateAtom
} from '../../../atoms/expiration'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import SelectMenu from '../../../compositions/SelectMenu'
import { IconButton } from '../../../primitives/IconButton'
import { Tooltip } from '../../../primitives/Tooltip'

import { StarIcon, GearIcon } from '@radix-ui/react-icons'

import { useGloballyConsistentColors } from '../../../hooks/useColors'
import { YearMonthSelectors } from './Selectors'
import { Navbar } from './Navbar'

import DayPicker from 'react-day-picker/DayPicker'
import { DateUtils } from 'react-day-picker'
import "react-day-picker/lib/style.css"

import { useDateFormatter } from '@react-aria/i18n'


const StyledCalendarContainer = styled(Box, {
    width: '385px',
    height: '370px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-start',
    ai: 'center',
    gap: '$1',
    margin: 0,
    bc: 'transparent',
    border: '1px solid $border', 
    br: '$2',
    '&:hover': {
        border: '2px solid border3', 
        br: '$2'
    }
})

const StyledCell = styled('button', {
    position: 'relative',
    height: '30px',
    width: '30px',
    display: 'flex', 
    fd: 'column',
    jc: 'center',
    ai: 'center',
    gap: '$1',
    bc: 'transparent',
    border: '1px solid $border',
    br: '$1',
    padding: '$1',
    margin: 0,
    '&:hover': {
        backgroundColor: '$accent',
        borderColor: '$border3',
    }
})

const StyledDate = styled(Text, {
    color: '$funkyText',
    size: '$2',
    fontWidth: 400,
    margin: '$1',
    '&:hover': {
        color: 'inherit'
    }
})

const getModifierStyles = (colors) => {
    return {
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
} 

function Weekday({ weekday, className, localeUtils, locale }) {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)

    return (
        <div className={className} title={weekdayName}>
            <Text size='3' css={{ color: '$accent' }}> 
                {weekdayName.slice(0, 1)} 
            </Text> 
        </div>
    )
}

export const ActivePage = () => {
    let formatter = useDateFormatter()
    const activePage = useAtomValue(activePageAtom)

    return (
        <Text size='4' css={{ color: '$funkyText', display: 'inline-block', fd: 'row', jc: 'flex-start', ai: 'flex-start'}}> 
            {formatter.format(activePage)} 
        </Text>
    );
}

const renderDay = (day) => (
    <StyledCell id={`date-${day.getDate()}-cell`}>
        <StyledDate> {day.getDate()} </StyledDate>
    </StyledCell>
)

export const Calendar = () => {
    const [activePage, setActivePage] = useAtom(activePageAtom)
    const [hoveredStartDate, setHoveredStartDate] = useAtom(hoveredStartDateAtom)
    const [enteredTo, setEnteredTo] = useAtom(hoveredEndDateAtom)
    const [from, setFrom] = useAtom(fromAtom)
    const [to, setTo] = useAtom(toAtom)    

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
            resetClick()
            return
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

    const modifiers = { start: from, end: enteredTo }
    const disabledDays = { before: from }
    const selectedDays = [from, { from, to: enteredTo }]

    const colors = useGloballyConsistentColors()

    return (
        <Flex css={{ height: '435px', fd: 'column', jc: 'space-between', ai: 'center', gap: '$1' }}>
            <StyledCalendarContainer>
                <DayPicker 
                    showWeekNumbers={true}
                    month={activePage}
                    fromMonth={from}
                    modifiers={modifiers}
                    renderDay={renderDay}
                    selectedDays={selectedDays}
                    disabledDays={disabledDays}
                    navbarElement={<Navbar />}
                    weekdayElement={<Weekday />}
                    onDayClick={handleDayClick}
                    onDayMouseEnter={handleDayMouseEnter}
                    modifiersStyles={getModifierStyles(colors)}
                    captionElement={({ date, localeUtils }) => (
                        <YearMonthSelectors
                            fromMonth={fromMonth}
                            toMonth={toMonth}
                            localeUtils={localeUtils}
                            onChange={(d) => setActivePage(d)}
                        />
                    )}
                /> 
            </StyledCalendarContainer>
            {/* <ActivePage />  */}
        </Flex>
    );
}
