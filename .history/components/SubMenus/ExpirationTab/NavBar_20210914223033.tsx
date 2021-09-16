import React from 'react'

import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { monthAtom, yearAtom } from './index'
import { IconButton } from '../../../primitives/IconButton'
import { Flex } from '../../../primitives/Flex'

import {  
    ChevronLeftIcon, 
    ChevronRightIcon 
} from '@radix-ui/react-icons'

interface ILocaleUtilsProps {
    formatDate(date: Date, format?: string | string[] | undefined, locale?: string | undefined): string;
    formatDay(day: Date, locale?: string | undefined): string;
    parseDate(str: string, format?: string | undefined, locale?: string | undefined): Date;
    parseDate(str: string, locale?: string | undefined): Date;
    getMonths(): string[]; 
}

interface INavbarProps {
    nextMonth: { getMonth: () => number; };
    previousMonth: { getMonth: () => number; };
    onPreviousClick: () => void;
    onNextClick: () => void;
    className: string;
    localeUtils: ILocaleUtilsProps; 
}

export const Navbar = ({
    nextMonth,
    previousMonth,
    onPreviousClick,
    onNextClick,
    className,
    localeUtils
}: INavbarProps) => {

    const months = localeUtils.getMonths()
    const prev = months[previousMonth.getMonth()]
    const next = months[nextMonth.getMonth()]

    const setMonth = useUpdateAtom(monthAtom)
    const [year, setYear] = useAtom(yearAtom)

    return (
        <>
            <IconButton 
                id={`month-selector-for-${className}`}
                size='1'
                variant='ghost'
                onClick={() => {
                    setMonth(previousMonth.getMonth())
                    if(prev==='December') setYear(year - 1); 
                    onPreviousClick()
                }}
                css={{ float: 'left', borderRadius: '$1', mt: '' }} 
            >
                <ChevronLeftIcon />
            </IconButton>
            <IconButton
                id={`year-selector-for-${className}`}
                size='1'
                variant='ghost'
                onClick={() => {
                    setMonth(nextMonth.getMonth())
                    if(next==='January') setYear(year + 1); 
                    onNextClick()
                }}
                css={{ float: 'right', borderRadius: '$1', mt: '$1' }}
            >
                <ChevronRightIcon />
            </IconButton>
        </>
    );
}