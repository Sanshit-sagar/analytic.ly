import React from 'react' 

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { monthAtom, yearAtom } from './index'

import { Flex } from '../../../primitives/Flex'
import SelectMenu from '../../../compositions/SelectMenu'

interface IMonthSelectorProps {
    onChange: (date: Date) => void;
    localeUtils: any;
}

interface IMonthItem { 
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

const MonthSelector = ({ onChange, localeUtils }: IMonthSelectorProps) => {
    const [month, setMonth] = useAtom(monthAtom)
    const year = useAtomValue(yearAtom)

    const handleMonthChange = (updatedMonth: number, updatedYear: number) => {
        setMonth(updatedMonth)
        onChange(new Date(updatedYear, updatedMonth))
    }
    
    const monthItems: IMonthItem[] = []
    const months = localeUtils.getMonths()
    months.map((month: string, i: number) => {
        monthItems.push({
            value: `${new Date(month).getMonth()}`,
            textValue: monthsStr[i],
            icon: undefined,
        })
    })

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

const YearSelector = ({ onChange, fromMonth, toMonth }: IYearSelectorProps) => {
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

    const handleYearChange = (updatedMonth: number, updatedYear: number) => {
        console.log(updatedMonth)
        setYear(updatedYear);
        onChange(new Date(updatedYear, month));
    }

    return (
        <SelectMenu
            selectOnly={true}
            items={yearItems}
            selectedIndex={year}
            setSelectedIndex={(value: number) => handleYearChange(month, parseInt(`${value}`) + 2021)}
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
        <form className={`Picker-on-date-${date}`}>
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$3', ml: '50px' }}>
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