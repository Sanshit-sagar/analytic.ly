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
    stageAtom,
    activePageAtom, 
    hoveredStartDateAtom,
    hoveredEndDateAtom
} from '../../../atoms/expiration'
import {
    localeFormatAtom
} from '../../../atoms/globals'

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

export const FmtDate = ({ date, fallback }: IFmtDateProps) => {
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
    const [enteredTo, setEnteredTo] = useAtom(hoveredEndDateAtom)

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


const Stage = () => {
    const currentStage = useAtomValue(stageAtom)
    return <Text> {currentStage} </Text>
}

const ActivePage = () => {
    const activePage = useAtomValue(activePageAtom)
    return <Text> {activePage} </Text>
}

const DateRangeInputs = () => (
    <DateRange>
        <FromDateInput />
        <ToDateInput /> 
    </DateRange>
)

// export const activePageAtom = atom<Date>(new Date())
// export const hoveredStartDateAtom = atom<Date | undefined>(undefined)
// export const hoveredEndDateAtom = atom<Date | undefined>(undefined)

const CustomCalendar = () => {
   
    const handleYearMonthChange = (updatedActiveDate: Date) => setActivePage(updatedActiveDate) 

    return (
        <StyledCalendarContainer>
            <Calendar/>
        </StyledCalendarContainer>
    );
}


export const ExpirationTabContent = () => {
    const locale = useAtomValue(localeFormatAtom) 

    return (
        <I18nProvider locale={locale}>
            <StyledExpirationTab>
                <CustomCalendar /> 
                <Stage /> 
                <DateRangeInputs />
            </StyledExpirationTab>    
        </I18nProvider>
    )
}