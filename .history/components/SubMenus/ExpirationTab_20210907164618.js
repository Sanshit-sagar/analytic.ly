// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html

import React from "react";
import ReactDOM from "react-dom";


import {DateUtils} from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

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

class RangeInput extends React.Component {
  focus = () => {

  }

  render() {
    const { value, selectedDays, ...props } = this.props;
    const { from, to } = selectedDays[1];

    return (
      <div>
        <input type='text' {...props} value={from || ""} />
        <input type='text' {...props} value={to || ""} />
      </div>
    )
  }
}

class Example extends React.Component {
  state = initialState;

  handleDayClick = day => {
    const { from, to } = this.state;

    if (from && to && day >= from && day <= to) {
      this.reset();
      return;
    }

    if (isSelectingFirstDay(from, to, day)) {
      this.setState({from: day, to: null,enteredTo: null}, () => {
        this.setState({ hideOnDayClick: true });
      });
    } else {
      this.setState({ to: day, enteredTo: day }, () => {
        this.setState({ hideOnDayClick: false });
      });
    }
  };

  handleDayMouseEnter = day => {
    const { from, to } = this.state;

    if (!isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  };

  reset = () => { this.setState(initialState) };

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div>
        {!from && !to && <p>Please select the <strong>first day</strong>.</p>}
        {from && !to && <p>Please select the <strong>last day</strong>.</p>}
        {from &&
          to &&
          <p>
            You chose from
            {' '}
            {JSON.stringify(from)}
            {' '}
            to
            {' '}
            {JSON.stringify(enteredTo)}
            .
            {' '}
            <a onClick={this.reset}>Reset</a>
          </p>}
        <DayPickerInput
          ref={el => this.el = el}
          hideOnDayClick={this.state.hideOnDayClick}
          className="Range"
          selectedDays={selectedDays}
          component={RangeInput}
          dayPickerProps={{
            numberOfMonths: 2,
            fromMonth: from,
            fixedWeeks: true,
            selectedDays: selectedDays,
            modifiers: modifiers,
            onDayClick: this.handleDayClick,
            onDayMouseEnter: this.handleDayMouseEnter,
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
