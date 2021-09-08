// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html
import React from 'react'
import { styled } from '../../stitches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import {DateUtils} from 'react-day-picker'
import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css";

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

const StyledCalendarContainer = styled(Box, {
    minHeight: '250px',
    maxHeight: '250px',
    display: 'flex', 
    fd: 'column',
    jc: 'center',
    ai: 'center',
    gap: '$1',
    mt: '$5',
    padding: '$1',
    bc: 'transparent',
    border: '$2 solid white',
    br: '$2',
    '&:hover': {
        border: '$2 solid $border3',
        boxShadow: `0 2px 2px $accentContrast`,
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
    '&:hover': {
        backgroundColor: '$accent',
        borderColor: '$border3'
    }
});

const StyledDate = styled(Text, {
    color: '$text',
    size: '$2',
    margin: '$1',
    '&:hover': {
        color: '$accent'
    }
});

const MonthSelector = () => {
    
}

function renderDay(day) {
    const date = day.getDate();

    return (
        <StyledCell>
            <StyledDate>
                {date}
            </StyledDate>
        </StyledCell>
    );
}

export const ExpirationTabContent = () => {

    return (
        <StyledCalendarContainer>
            <DayPicker 
                className="SlugLifetimeSelector"
                renderDay={renderDay}
                canChangeMonth={true}
                canChangeYear={false}
            />
        </StyledCalendarContainer>
    );
}