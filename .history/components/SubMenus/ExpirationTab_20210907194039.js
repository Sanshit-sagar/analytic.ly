// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html

import React from 'react'
import {DateUtils} from 'react-day-picker'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import "react-day-picker/lib/style.css";

import { Flex } from '../../primitives/Flex'


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

exp

export const ExpirationTabContent = () => {

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$3', height: '100px' }}>
            <ExpirationTab />
        </Flex>
    );
}