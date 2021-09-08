import React from 'react'
import { styled } from '../../stitches.config'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'

import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css"


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

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 1, 1);

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

function YearMonthForm({ date, localeUtils, onChange }) {
    const months = localeUtils.getMonths();
  
    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
      years.push(i);
    }
  
    const handleChange = function handleChange(e) {
      const { year, month } = e.target.form;
      onChange(new Date(year.value, month.value));
    };
  
    return (
      <form className="DayPicker-Caption">
        <select name="month" onChange={handleChange} value={date.getMonth()}>
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select name="year" onChange={handleChange} value={date.getFullYear()}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </form>
    );
  }

export default class ExpirationTabContent extends React.Component {
    constructor(props) {
        super(props);
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
        this.state = {
            month: fromMonth,
        };
    }
    
    handleYearMonthChange(month) {
        this.setState({ month });
    }
    
    render() {
        return (
            <StyledCalendarContainer>
                <div className="YearNavigation">
                <DayPicker 
                    month={this.state.month}
                    fromMonth={fromMonth}
                    toMonth={toMonth}
                    renderDay={renderDay}
                    captionElement={({ date, localeUtils }) => (
                        <YearMonthForm
                            date={date}
                            localeUtils={localeUtils}
                            onChange={this.handleYearMonthChange}
                        />
                    )}
                />
                </div>
                <Flex css={{ fd: column, jc: 'flex-start', ai: 'flex-start' }}>
                    <Text> Selected Month: {month} </Text> 
                </Flex>
            </StyledCalendarContainer>
            
        );
    }
}