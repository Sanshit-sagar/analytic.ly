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



const initialState = {
  from: null,
  to: null,
  hideOnDayClick: false,
  enteredTo: null // Keep track of the last day for mouseEnter.
};

function isSelectingFirstDay(from, to, day) {
  const firstDayIsNotSelected = !from;
  const selectedDayIsBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
  const rangeIsSelected = from && to;
  return (
    firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected
  );
}

const EMPTY_INPUTS = {
    from: '',
    to: ''
};

class RangeInput extends React.Component {
  focus = () => {

  }

  render() {
    const { value, selectedDays, ...props } = this.props

    let { from, to } = (!selectedDays?.length) ? EMPTY_INPUTS : selectedDays[1] 

    return (
      <div>
        <input type='text' {...props} value={from || ""} />
        <input type='text' {...props} value={to || ""} />
      </div>
    )
  }
}







































































export const ExpirationTabContent = () => {

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$3', height: '100px' }}>
            <ExpirationTab />
        </Flex>
    );
}