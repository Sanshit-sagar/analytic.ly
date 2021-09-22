import React from 'react'

import { useAtom } from 'jotai'

import { 
    activePageAtom, 
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
}

const getYear = (date: Date): number => new Date(date).getFullYear(); 

const NavButton = ({ id, className, handleClick }: { 
    id: string; 
    className: string; 
    handleClick: (event: React.MouseEvent<HTMLButtonElement>; 
}) => (
   
);

const PrevButton = ({ className, onClick, transform }: { 
    className: string; 
    onClick: () => void; 
    transform: (n: number) => number; 
}) => {
    const [activePage, setActivePage] = useAtom(activePageAtom)
    
    const navigateToPrevMonth = (_event: React.MouseEvent<HTMLButtonElement>) => {
        let updatedMonth = transform(new Date(activePage).getMonth())
        let updatedYear = updatedMonth===12 ? transform(getYear(activePage)) : getYear(activePage) 
        setActivePage(new Date(updatedYear, updatedMonth, 1))
        onClick()
    }
    
    return (
        <Tooltip content={`${new Date(activePage).getMonth() - 1}`}>
             <IconButton
        id={id}
        className={className}
        size='2'
        variant='ghost'
        onClick={handleClick} 
        css={{ float: 'left', br: '$1',  margin: '$2', height: '35px', width: '35px'}} 
    />
        </Tooltip>
    )
}


export const Navbar = ({
    onPreviousClick,
    onNextClick,
    className,
}: INavbarProps) => {

    const [activePage, setActivePage] = useAtom(activePageAtom)

    return (
        <>
            
                <IconButton 
                  
                    onClick={() => {

                    }}
                   
                >
                    <ChevronLeftIcon />
                </IconButton>
            </Tooltip>

            <Tooltip content={`${new Date(activePage).getMonth() + 1}`}>
                <IconButton
                    id={`year-selector-for-${className}`}
                    size='2'
                    variant='ghost'
                    onClick={() => {
                        let updatedMonth = new Date(activePage).getMonth() + 1
                        let updatedYear = updatedMonth===1 ? getYear(activePage) + 1 : getYear(activePage) 
                        setActivePage(new Date(updatedYear, updatedMonth, 1))
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