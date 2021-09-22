import React from 'react'
import { styled } from '../../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import { I18nProvider, useDateFormatter } from '@react-aria/i18n'

import { Calendar } from './Calendar'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

import {  
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
})

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

export const FmtDate = ({ date }: { date: Date; }) => {
    let formatter = useDateFormatter();
    return <FormattedDateText> {formatter.format(date)} </FormattedDateText> 
}

const sanitizeDate = (d: any | undefined | null): Date => {
    return !d ? new Date() : new Date(d)
}

const ToDateInput = () => {
    const enteredTo = useAtomValue(hoveredEndDateAtom)
    return <FmtDate date={sanitizeDate(enteredTo)} /> 
}

const FromDateInput = () => { 
    const hoveredStartDate = useAtomValue(hoveredStartDateAtom)
    return <FmtDate date={sanitizeDate(hoveredStartDate)}  type="START"/> 
}

const DateRangeInputs = () => (
    <DateRange>
        <FromDateInput />
        <ToDateInput /> 
    </DateRange>
)

export const ExpirationTabContent = () => {
    const locale = useAtomValue(localeFormatAtom) 

    return (
        <I18nProvider locale={locale}>
            <StyledExpirationTab>
                <Calendar /> 
                <DateRangeInputs />
            </StyledExpirationTab>    
        </I18nProvider>
    )
}