import { useAtom } from 'jotai'
import React from 'react'
import { IconButton } from '../../../primitives/IconButton'


import { monthAtom, yearAtom } from './index'

interface INavbarProps {
    nextMonth: string;
    previousMonth: { getMonth};
    onPreviousClick: (event: React.ChangeEvent<HTMLButtonElement>) => void;
    onNextClick: (event: React.ChangeEvent<HTMLButtonElement>) => void;
    className: string;
    localeUtils: any; 
}


function Navbar({
    nextMonth,
    previousMonth,
    onPreviousClick,
    onNextClick,
    className,
    localeUtils,
}: INavbarProps) {
    const months = localeUtils.getMonths()
    const prev = months[previousMonth.getMonth()]
    const next = months[nextMonth.getMonth()]

    const [month, setMonth] = useAtom(monthAtom)
    const [year, setYear] = useAtom(yearAtom)

    return (
        <>
            <IconButton 
                size='1'
                onClick={() => {
                    setMonth(previousMonth.getMonth())
                    if(prev==='December') setYear(year - 1); 
                    onPreviousClick()
                }}
                css={{ float: 'left', borderRadius: '$1' }} 
            >
                <ChevronLeftIcon />
            </IconButton>
            <IconButton
                size='1'
                onClick={() => {
                    setMonth(nextMonth.getMonth())
                    if(next==='January') setYear(year + 1); 
                    onNextClick()
                }}
                css={{ float: 'right', borderRadius: '$1' }}
            >
                <ChevronRightIcon />
            </IconButton>
        </>
    );
}