import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { useAtom } from 'jotai'

import { Calendar, FmtDate } from './Calendar'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'
import { fromMonth, hoveredStartDateAtom } from '../../../atoms/expiration'


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

const StyledCalendarContainer = () => {
    const [to, setTo] = useState<Date | undefined | null>(null)
    const [from, setFrom] = useState<Date | undefined | null>(null)
    const [month, setMonth] = useState<Date | undefined | null>(fromMonth)
    const [enteredTo, setEnteredTo] = useState<Date | undefined | null>(null)
    const [hoveredStartDate, setHoveredStartDate] = useAtom(hoveredStartDateAtom)

    const handleToChange = (updatedTo: Date) => setTo(updatedTo)
    const handleFromChange = (updatedFrom: Date) => setFrom(updatedFrom)
    const handleEnteredToChange = (updatedEnteredTo: Date) => setEnteredTo(updatedEnteredTo)
    const handleHoveredStartDateChange = (updatedStartDate: Date) => setHoveredStartDate(updatedStartDate)
    const handleYearMonthChange = (updatedMonth: Date) => setMonth(updatedMonth) 

    return (
        <StyledCalendarContainer>
            <Calendar
                to={to}
                from={from}
                month={month}
                enteredTo={enteredTo}
                hoveredStartDate={hoveredStartDate}
                handleYearMonthChange={handleYearMonthChange}
                setHoveredStartDate={handleHoveredStartDateChange}
                setEnteredTo={handleEnteredToChange}
                setTo={handleToChange}
                setFrom={handleFromChange}
            />
        </StyledCalendarContainer>
    );
}

export const ExpirationTabContent = () => {
  

    return (
        <StyledExpirationTab>
        


            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
                <FmtDate date={new Date(hoveredStartDate)} fallback={new Date(from)}/> 
                <FmtDate date={new Date(enteredTo)} fallback={new Date(to)} /> 
            </Flex>   
        </StyledExpirationTab>    
    )
}

