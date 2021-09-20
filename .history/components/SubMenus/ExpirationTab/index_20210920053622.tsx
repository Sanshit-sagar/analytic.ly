import React, { useState } from 'react'
import { styled } from '../../../stitches.config'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { I18nProvider, useDateFormatter } from '@react-aria/i18n'

import { Calendar } from './Calendar'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

interface IFmtDateProps {
    date: number;
    fallback: number;
    handleUpdate: (d: Date) => void;
    handleHover: (d: Date) => void; 
}

import { 
    fromMonth, 
    hoveredStartDateAtom 
} from '../../../atoms/expiration'
import {
    localeFormatAtom
} from '../../../atoms/globals'
import { CustomNumberField } from './test'

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

const DateRange = styled(Flex, {
    height: '100%', 
    width: '100%', 
    fd: 'row', 
    jc: 'space-around', 
    ai: 'center', 
    gap: '$4' 
});

const FormattedDateText = ({ children }: { children: any }) => (
    <Text css={{ fontSize: '$6', color: '$funkyText' }}> 
        {children} 
    </Text>
);

export const FmtDate = ({ date, fallback, handleUpdate, handleHover }: IFmtDateProps) => {
    let formatter = useDateFormatter();

    try {
        return <FormattedDateText> {formatter.format(date)} </FormattedDateText> 
    } catch(error) {
        return <FormattedDateText> {formatter.format(new Date(fallback))} </FormattedDateText>
    }
}

const sanitizeDate = (d: any | undefined | null) => {
    try {
        return !d ? new Date().getTime() : new Date(d).getTime()
    } catch(error) {
        return new Date().getTime(); 
    }
}

const ToDateInput = () => {
    const [to, setTo] = useState<Date | undefined | null>(null)
    const [enteredTo, setEnteredTo] = useState<Date | undefined | null>(null)

    const updateTo = (updatedTo: Date) => setTo(updatedTo)
    const hoverTo = (hoveredAt: Date) => setEnteredTo(hoveredAt)

    return (
        <FmtDate 
            date={sanitizeDate(enteredTo)} 
            fallback={sanitizeDate(to)} 
            handleUpdate={updateTo} 
            handleHover={hoverTo} 
        /> 
    );
}

const FromDateInput = () => {
    const [from, setFrom] = useState<Date | undefined | null>(null)    
    const [hoveredStartDate, setHoveredStartDate] = useAtom(hoveredStartDateAtom)
    const updateFrom = (updatedFrom: Date) => setFrom(updatedFrom)
    const hoverFrom = (hoveredAt: Date) => setHoveredStartDate(hoveredAt)

    return (
        <FmtDate 
            date={sanitizeDate(hoveredStartDate)} 
            fallback={sanitizeDate(from)}
            handleUpdate={updateFrom}
            handleHover={hoverFrom} 
        /> 
    );
}

const DateRangeInputs = () => (
    <DateRange>
        <FromDateInput />
        <ToDateInput /> 
    </DateRange>
)


const CustomCalendar = () => {
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
    const locale = useAtomValue(localeFormatAtom) 

    return (
        <I18nProvider locale={locale}>
            <CustomNumberField /> 
        </I18nProvider>
    )
}
<StyledExpirationTab>
    <CustomCalendar /> 
    <DateRangeInputs />
</StyledExpirationTab>    