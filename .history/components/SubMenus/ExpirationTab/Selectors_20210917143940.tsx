import React from 'react' 

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { activeYearAtom, activeMonthAtom } from '../../../atoms/expiration'

import { Flex } from '../../../primitives/Flex'
import SelectMenu from '../../../compositions/SelectMenu'

interface IMonthSelectorProps {
    onChange: (date: Date) => void;
    localeUtils: any;
}

interface ICalendarItem {
    value: string;
    textValue: string;
    icon: any | undefined;
}[]

interface IYearSelectorProps {
    onChange: (date: Date) => void;
    fromMonth: Date;
    toMonth: Date; 
}

interface IYearMonthFormProps {
    date: Date;
    fromMonth: Date;
    toMonth: Date;
    localeUtils: any;
    onChange: (date: Date) => void;
}

const monthsStr = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September',  
    'October', 
    'November', 
    'December'
]

function getMonthsInRange(localeUtils: any): ICalendarItem[] {
    const monthItems: ICalendarItem[] = [];
    localeUtils.getMonths().map((month: string, i: number) => {
        monthItems.push({
            value: `${new Date(month).getMonth()}`,
            textValue: monthsStr[i],
            icon: undefined,
        })
    });
    return monthItems
}

const MonthSelector = ({ onChange, localeUtils }: IMonthSelectorProps) => {
    const [month, setMonth] = useAtom(activeYearAtom)
    const year = useAtomValue(activeMonthAtom)

    const handleMonthChange = (updatedMonth: number, updatedYear: number) => {
        setMonth(updatedMonth)
        onChange(new Date(updatedYear, updatedMonth))
    }

    const monthItems: ICalendarItem[] = getMonthsInRange(localeUtils);
    const sanitizedMonth = parseInt(`${month}`)

    return (
        <SelectMenu 
            selectOnly={true}
            items={monthItems}
            selectedIndex={sanitizedMonth}
            setSelectedIndex={(value: number) => handleMonthChange(parseInt(`${value}`), year)}
            selectedValue={`${sanitizedMonth}`}
            selectedTextValue={monthsStr[sanitizedMonth]}
            group={'Months'}
        />
    );
}

function getYearsInRange(fromYear: Date, toYear: Date): ICalendarItem[] {
    const yearItems: ICalendarItem[] = []
    for (let i = fromYear.getFullYear(); i <= toYear.getFullYear(); i += 1) {
        yearItems.push({ 
            value:`${i}`, 
            textValue:`${i}`, 
            icon: undefined 
        });
    }
    return yearItems
}

const YearSelector = ({ onChange, fromMonth, toMonth }: IYearSelectorProps) => {
    const [year, setYear] = useAtom(activeYearAtom)
    const month = useAtomValue(activeMonthAtom)

    const handleYearChange = (updatedYear: number) => {
        setYear(updatedYear);
        onChange(new Date(updatedYear, updatedMonth));
    }

    const yearItems = getYearsInRange(fromMonth, toMonth)

    return (
        <SelectMenu
            selectOnly={true}
            items={yearItems}
            selectedIndex={year}
            setSelectedIndex={(value: number) => handleYearChange(parseInt(`${value}`) + 2021)}
            selectedValue={`${year}`}
            selectedTextValue={`${year}`}
            group={'Years'}
        />
    );
}

export const YearMonthSelectors = ({ 
    date, 
    fromMonth, 
    toMonth, 
    localeUtils, 
    onChange 
}: IYearMonthFormProps) => {


    return (
        <form className="DayPicker-Caption">
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$3', ml: '40px' }}>
                <MonthSelector
                    onChange={onChange} 
                    localeUtils={localeUtils} 
                />
                <YearSelector 
                    onChange={onChange} 
                    fromMonth={fromMonth}
                    toMonth={toMonth}
                />
            </Flex>
        </form>
    );
}