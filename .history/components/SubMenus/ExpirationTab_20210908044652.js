import React from 'react'
import { styled } from '../../stitches.config'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css"

import { atom, useAtom } from 'jotai'
import { StarIcon } from '@radix-ui/react-icons'
import SelectMenu from '../../compositions/SelectMenu'

import {I18nProvider, useDateFormatter} from '@react-aria/i18n';

const StyledCalendarContainer = styled(Box, {
    width: '350px',
    height: '375px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-start',
    ai: 'center',
    gap: '$1',
    margin: 0,
    mt: '$2',
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

const FmtDate = ({ date }) => {
    let formatter = useDateFormatter();
    
    return (
        <I18nProvider locale="en-US">
            <FmtDate date={this.state.month} />
            <Text> {formatter.format(new Date(date))} </Text>
        </I18nProvider>
    );
}

const monthsStr = [
    'Jan', 'Feb', 'Mar', 
    'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sept', 
    'Oct', 'Nov', 'Dec'
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const fromMonth = new Date(currentYear, currentMonth);
const toMonth = new Date(currentYear + 1, currentMonth + 1);

const monthAtom = atom(fromMonth)
const yearAtom = atom(currentYear)

function YearMonthForm({ date, localeUtils, onChange }) {
    const [month, setMonth] = useAtom(monthAtom)
    const [year, setYear] = useAtom(yearAtom)

    const months = localeUtils.getMonths();

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
      years.push(i);
    }
  
    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        setMonth(month)
        setYear(year)
        onChange(new Date(year.value, month.value))
    };

    const handleMonthChange = (updatedMonth) => {
        setMonth(updatedMonth)
        setYear(year)
        onChange(new Date(year, month));
    }

    const monthItems = [];
        months.map((month, i) => {
            monthItems.push({
                value: `${new Date(month).getMonth()}`,
                textValue: monthsStr[i],
                icon: <StarIcon /> 
            })
        })

    const monthDate = new Date(month).getMonth()
  
    return (
        <form className="DayPicker-Caption">
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$2'}}>
                <SelectMenu 
                    selectOnly={true}
                    items={monthItems}
                    selectedIndex={sanitizedDate}
                    setSelectedIndex={handleMonthChange}
                    selectedValue={sanitizedDate}
                    selectedTextValue={monthsStr[sanitizedDate]}
                    group={'Months'}
                />
                <SelectMenu
                    selectOnly={true}
                    items={yearItems}
                    selectedIndex={sanitizedYear}
                    setSelectedIndex={handleMonthChange}
                    selectedValue={sanitizedDate}
                />
            </Flex>
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
            </StyledCalendarContainer>
            
        );
    }
}