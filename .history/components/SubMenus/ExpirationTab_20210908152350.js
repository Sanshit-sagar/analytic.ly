import React, { useState } from 'react'
import { styled } from '../../stitches.config'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { DateUtils } from 'react-day-picker'
import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css"

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { StarIcon, GearIcon } from '@radix-ui/react-icons'
import SelectMenu from '../../compositions/SelectMenu'


import {I18nProvider, useDateFormatter} from '@react-aria/i18n';

const StyledCalendarContainer = styled(Box, {
    width: '385px',
    height: '400px',
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
    color: '$accent',
    '&:hover': {
        backgroundColor: '$accent',
        borderColor: '$border3',
        color: '$funky'
    }
});

const StyledDate = styled(Text, {
    color: 'inherit',
    size: '$2',
    fontWidth: 400,
    margin: '$1',
    '&:hover': {
        color: 'inherit'
    }
});

const MonthYearSelectors = styled('div', {
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$2',
    position: 'absolute',

})

const monthsStr = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September',  'October', 'November', 'December'
];

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const fromMonth = new Date(currentYear, currentMonth)
const toMonth = new Date(currentYear + 1, currentMonth + 1)

const monthAtom = atom(currentMonth)
const yearAtom = atom(currentYear)
const dateAtom = atom(
    (get) => new Date(get(yearAtom), get(monthAtom))
);
const monthAtomsAtom = atom(
    (get) => get(dateAtom).getMonth(),
    (_get, set, update) => set(monthAtom, update)
);
const yearAtomsAtom = atom(
    (get) => get(dateAtom).getFullYear(),
    (_get, set, update) => set(yearAtom, update)
);


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
            <Text> {formatter.format(new Date(date))} </Text>
        </I18nProvider>
    );
}

const MonthSelector = ({ onChange, localeUtils }) => {
    const [month, setMonth] = useAtom(monthAtom)
    const year = useAtomValue(yearAtom);

    const handleMonthChange = (updatedMonth, updatedYear) => {
        setMonth(updatedMonth);
        onChange(new Date(updatedYear, updatedMonth));        
    }
    
    const monthItems = [];
    const months = localeUtils.getMonths();
    months.map((month, i) => {
        monthItems.push({
            value: `${new Date(month).getMonth()}`,
            textValue: monthsStr[i],
            icon: undefined,
        })
    });
    const sanitizedMonth = parseInt(`${month}`)

    return (
        <SelectMenu 
            selectOnly={true}
            items={monthItems}
            selectedIndex={sanitizedMonth}
            setSelectedIndex={(value) => handleMonthChange(value, year)}
            selectedValue={sanitizedMonth}
            selectedTextValue={monthsStr[sanitizedMonth]}
            group={'Months'}
        />
    );
}

const YearSelector = ({ onChange }) => {
    const [year, setYear] = useAtom(yearAtom)
    const month = useAtomValue(monthAtom)

    const yearItems = []
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        yearItems.push({ 
            value:`${i}`, 
            textValue:`${i}`, 
            icon: undefined 
        });
    }

    const handleYearChange = (updatedMonth, updatedYear) => {
        setYear(updatedYear);
        onChange(new Date(updatedYear, month));
    }

    return (
        <SelectMenu
            selectOnly={true}
            items={yearItems}
            selectedIndex={year}
            setSelectedIndex={(value) => handleYearChange(month, value + 2021)}
            selectedValue={year}
            selectedTextValue={`${year}`}
            group={'Years'}
        />
    );
}

function YearMonthForm({ date, localeUtils, onChange }) {
    

    return (
        <form className="DayPicker-Caption">
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$2', mb: '$3'}}>
                <MonthSelector
                    onChange={onChange} 
                    localeUtils={localeUtils} 
                />
                <YearSelector onChange={onChange} />
            </Flex>
        </form>
    );
}


const toggleWeeks = () => setShowWeeks(!showWeeks)
const NUM_MSP_PER_DAY = 1000*60*60*24

const focussedMonthAtom = atom(currentMonth)
const showWeekNumbersAtom = atom(false)
const disableWeekendsAtom = atom(false)
const showOutsideNumbersAtom = atom(false)

const Options = () => {
    const [showWeeks, setShowWeeks] = useAtom(showWeekNumbersAtom)
    const [showOutsides, setShowOutsides] = useAtom(showOutsideNumbersAtom)
    const [disabledWeekends, setDisabledWeekends] = useAtom(disableWeekendsAtom)

    const options = [
        { id: 'weeks', value: showWeeks, toggle: setShowWeeks },
        { id: 'weeks', value: showWeeks, toggle: setShowWeeks },
        
    ]

    return (
    <>
        <button onClick={setShowWeeks(!showWeeks)}>

        </button>
    )
}

const ExpirationTabContent = () => {
    const [month, setMonth] = useAtom(focussedMonthAtom)

    const showWeekNumbers = useAtomValue(showWeekNumbersAtom)
    const disableWeekends = useAtomValue(disableWeekendsAtom)
    const showOutsideNumbers = useAtomValue(showOutsideNumbersAtom)
    
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [enteredTo, setEnteredTo] = useState(null)
    const handleYearMonthChange = (updatedMonth) => setMonth(updatedMonth) 

    function resetClick() {
        setFrom(null)
        setTo(null)
        setEnteredTo(null)
    }

    function updateState(updatedFrom = from, updatedTo = to, updatedEnteredTo = enteredTo) {
        setFrom(updatedFrom)
        setTo(updatedTo)
        setEnteredTo(updatedEnteredTo)
    }

    function isSelectingFirstDay(from, to, day) {
        const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
        const isRangeSelected = from && to
        return !from || isBeforeFirstDay || isRangeSelected
    }

    function handleDayClick(day) {
        if(from && to && day>=from && day<=to) {
            resetClick();
            return;
        }
        if(isSelectingFirstDay(from, to, day)) {
            updateState(day, null, null)
        } else {
            updateState(from, day, day);
        }
    }

    function handleDayMouseEnter(day) {
        if(!isSelectingFirstDay(from, to, day)) setEnteredTo(day)
    }

    function getRangeInMs(range) {
        try {
            intervalStart = new Date(parseInt(range[1].from)).getTime()
            intervalEnd = new Date(parseInt(range[1].to)).getTime()
            return intervalEnd - intervalStart
        } catch(error) {
            return 0; 
        }
    }

    const modifiers = { start: from, end: enteredTo }
    const disabledDays = { before: from }
    const selectedDays = [from, { from, to: enteredTo }]

    let numSelectedMs = selectedDays && selectedDays?.length===2 ? getRangeInMs(selectedDays) : 0
    let numSelectedDays = numSelectedMs ? (numSelectedMs / NUM_MSP_PER_DAY) : 0

    return (
        <StyledCalendarContainer>
            <DayPicker 
                month={month}
                fromMonth={from}
                modifiers={modifiers}
                renderDay={renderDay}
                selectedDays={selectedDays}
                disabledDays={disabledDays}
                onDayClick={handleDayClick}
                onDayMouseEnter={handleDayMouseEnter}
                captionElement={({ date, localeUtils }) => (
                    <YearMonthForm
                        date={date}
                        localeUtils={localeUtils}
                        onChange={handleYearMonthChange}
                    />
                )}
            />
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}>
                <FmtDate date={selectedDays[1].from || ''} />
                <FmtDate date={selectedDays[1].to || ''} />
            </Flex>
        </StyledCalendarContainer>
    );
}

export default ExpirationTabContent