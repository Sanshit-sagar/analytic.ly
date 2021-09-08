// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html
import React, { useState } from 'react'
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
    width: '350px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-end',
    ai: 'center',
    gap: '$1',
    margin: 0,
    mt: '$5',
    padding: '$1',
    bc: 'transparent',
    border: '2px solid $border', 
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
    '&:hover': {
        backgroundColor: '$accent',
        borderColor: '$border3'
    }
});

const StyledDate = styled(Text, {
    color: '$text',
    size: '$2',
    margin: '$1'
});

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

const slugTimeframeAtom = atom({ from: undefined, to: undefined });
const slugTimeframeStartAtom = atom(
    (get) => get(slugTimeframeAtom).from,
    (_get, set, update: React.SetStateAction<Date | undefined>) => {
        set(slugTimeframeAtom, {
            from: update,
            to: slugTimeframeAtom.toString,
        }); 
    }
);

export const ExpirationTabContent = () => {
    


    const handleDayClick = () => alert('clicked!')
    const handleMouseEnter = () => setTester(`${tester}1mo`);

    return (
        <StyledCalendarContainer>
            <DayPicker 
                className="SlugLifetimeSelector"
                renderDay={renderDay}
                canChangeMonth={true}
                dayPickerProps={{
                    numberOfMonths: 1,
                    fromMonth: new Date().getMonth(),
                    onDayClick: () => handleDayClick(),
                    onDayMouseEnter: () => handleMouseEnter(),
                }}
        
            />
        </StyledCalendarContainer>
    );
}