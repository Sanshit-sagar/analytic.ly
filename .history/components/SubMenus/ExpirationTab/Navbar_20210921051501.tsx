import React from 'react'

import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { 
    activeMonthAtom, 
    activeYearAtom 
} from '../../../atoms/expiration'

import { IconButton } from '../../../primitives/IconButton'

import {  
    ChevronLeftIcon, 
    ChevronRightIcon 
} from '@radix-ui/react-icons'

import { Tooltip } from '../../../primitives/Tooltip'

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
    activePage: Date;
    updateActivePage: (d: Date) => void;
}

export const Navbar = ({
    nextMonth,
    previousMonth,
    onPreviousClick,
    onNextClick,
    className,
    localeUtils,
    activePage,
    updateActivePage
}: INavbarProps) => {

    const months = localeUtils.getMonths()
    const prev = months[previousMonth.getMonth()]
    const next = months[nextMonth.getMonth()]

    const setMonth = useUpdateAtom(activeMonthAtom)
    const [year, setYear] = useAtom(activeYearAtom)

    return (
        <>
            <Tooltip content={`${previousMonth.getMonth()}`}>
                <IconButton 
                    id={`month-selector-for-${className}`}
                    size='2'
                    variant='ghost'
                    onClick={() => {
                        setMonth(previousMonth.getMonth())
                        if(prev==='December') setYear(year - 1); 
                        
                        updateActivePage(new Date(year, previousMonth.getMonth(), 1))

                        onPreviousClick()
                    }}
                    css={{float: 'left', br: '$1',  margin: '$2', height: '35px', width: '35px'}} 
                >
                    <ChevronLeftIcon />
                </IconButton>
            </Tooltip>

            <p> {new Date(activePage).toLo()} </p>

            <Tooltip content={`${nextMonth.getMonth()}`}>
                <IconButton
                    id={`year-selector-for-${className}`}
                    size='2'
                    variant='ghost'
                    onClick={() => {
                        setMonth(nextMonth.getMonth())
                        if(next==='January') setYear(year + 1)
                        updateActivePage(new Date(year, nextMonth.getMonth(), 1))
                        onNextClick()
                    }}
                    css={{ float: 'right', br: '$1', margin: '$2', height: '35px', width: '35px' }}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Tooltip>
        </>
    );
}