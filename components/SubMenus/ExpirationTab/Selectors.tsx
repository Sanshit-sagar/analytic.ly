import React from 'react' 

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { activeYearAtom, activeMonthAtom, activePageAtom } from '../../../atoms/expiration'

import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

import SelectMenu from '../../../compositions/SelectMenu'
import { CalendarIcon, DashboardIcon } from '@radix-ui/react-icons'

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
    ['January', 'Jan'],
    ['February', 'Feb'],
    ['March', 'Mar'],
    ['April', 'Apr'],
    ['May', 'May'],
    ['June', 'Jun'],
    ['July', 'Jul'],
    ['August', 'Aug'],
    ['September', 'Sept'],
    ['October', 'Oct'],
    ['November', 'Nov'],
    ['December', 'Dex'],
]

function getMonthsInRange(localeUtils: any): ICalendarItem[] {
    const monthItems: ICalendarItem[] = [];
    localeUtils.getMonths().map((month: string, i: number) => {
        monthItems.push({
            value: `${new Date(month).getMonth()}`,
            textValue: monthsStr[i][1],
            icon: undefined,
        })
    });
    return monthItems
}

const MonthSelector = ({ onChange, localeUtils }: IMonthSelectorProps) => {
    const [activePage, setActivePage] = useAtom(activePageAtom)
   

    const handleMonthChange = (updatedMonth: number) => {
        setActivePage(new Date(new Date(activePage).getFullYear(), updatedMonth))
    }

    const monthItems: ICalendarItem[] = getMonthsInRange(localeUtils);
    const sanitizedMonth = parseInt(`${new Date(activePage).getMonth()}`)

    return (
        <SelectMenu 
            selectOnly={true}
            items={monthItems}
            selectedIndex={sanitizedMonth}
            setSelectedIndex={(value: number) => handleMonthChange(parseInt(`${value}`))}
            selectedValue={`${sanitizedMonth}`}
            selectedTextValue={<> <CalendarIcon /> <Text> {monthsStr[sanitizedMonth][1]} </Text> </>}
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
        })
    }
    return yearItems
}

const YearSelector = ({ onChange, fromMonth, toMonth }: IYearSelectorProps) => {
    const [year, setYear] = useAtom(activeYearAtom)
    const month = useAtomValue(activeMonthAtom)

    const handleYearChange = (updatedYear: number) => {
        setYear(updatedYear);
        onChange(new Date(updatedYear, month));
    }

    const yearItems = getYearsInRange(fromMonth, toMonth)

    return (
        <SelectMenu
            selectOnly={true}
            items={yearItems}
            selectedIndex={year}
            setSelectedIndex={(value: number) => handleYearChange(parseInt(`${value}`) + 2021)}
            selectedValue={`${year}`}
            selectedTextValue={<> <DashboardIcon /> <Text>{year} </Text></>}
            group={'Years'}
        />
    );
}

export const YearMonthSelectors = ({ 
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