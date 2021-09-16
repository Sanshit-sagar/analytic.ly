import React from 'react' 

import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { monthAtom, yearAtom } from './index'

interface IMonthSelectorProps {
    onChange: (date: Date) => void;
    localeUtils: any;
}

const MonthSelector = ({ onChange, localeUtils }: IMonthSelectorProps) => {
    const [month, setMonth] = useAtom(monthAtom)
    const year = useAtomValue(yearAtom)

    const handleMonthChange = (updatedMonth: number, updatedYear: number) => {
        setMonth(updatedMonth)
        onChange(new Date(updatedYear, updatedMonth))
    }
    
    const monthItems = []
    const months = localeUtils.getMonths()
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
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$3', ml: '50px' }}>
                <MonthSelector
                    onChange={onChange} 
                    localeUtils={localeUtils} 
                />
                <YearSelector 
                    onChange={onChange} 
                />
            </Flex>
        </form>
    );
}