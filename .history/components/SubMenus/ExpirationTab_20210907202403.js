// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html
import React from 'react'
import { styled } from '../../stiches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import {DateUtils} from 'react-day-picker'
import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css";

import { FlexCenterCenterColumn } from '../../primitives/Shared'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

const StyledCell = styled('div', {
    backgroundColor: 'transparent',
    border: '$1 solid $border',
    br: '0.5px',
    '&:hover': {
        backgroundColor: '$panel',
        borderColor: '$border3'
    }
});

const StyledDate = styled(Text, {
    color: '$text',
    
})


function renderDay(day) {
    const date = day.getDate();

    const dateStyle = {
        position: 'absolute',
        color: 'lightgray',
        bottom: 0,
        right: 0,
        fontSize: 20,
    };
    const cellStyle = {
        height: 50,
        width: 60,
        position: 'relative',
    };

    return (
        <div style={cellStyle}> 
            <div style={dateStyle}>
                {date}
            </div>
        </div>
    );
}

export const ExpirationTabContent = () => {

    return (
        <FlexCenterCenterColumn>
            <DayPicker 
                className="SlugLifetimeSelector"
                renderDay={renderDay}
                canChangeMonth={true}
            />
        </FlexCenterCenterColumn>
    );
}