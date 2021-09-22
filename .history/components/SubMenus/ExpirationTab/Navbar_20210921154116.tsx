import React from 'react'

import { useAtom } from 'jotai'
import { activePageAtom } from '../../../atoms/expiration'

import { IconButton } from '../../../primitives/IconButton'
import { Tooltip } from '../../../primitives/Tooltip'

import {  
    ChevronLeftIcon, 
    ChevronRightIcon 
} from '@radix-ui/react-icons'

const leftNavButtonStyles = { br: '$1',  margin: '$2', height: '35px', width: '35px', float: 'left' }
const rightNavButtonStyles = { br: '$1',  margin: '$2', height: '35px', width: '35px', float: 'right' }

interface INavbarProps {
    onPreviousClick: () => void;
    onNextClick: () => void;
    className: string;
}

const getYear = (date: Date): number => new Date(date).getFullYear(); 


const NavButton = ({ 
    name,
    icon,
    className, 
    onClick, 
    transform 
}: { 
    name: { str: string; dir: string };  
    icon: any;
    className: string; 
    onClick: () => void; 
    transform: (n: number) => number; 
}) => {
    const [activePage, setActivePage] = useAtom(activePageAtom)
    
    const handleNavigation = (_event: React.MouseEvent<HTMLButtonElement>) => {
        let updatedMonth = transform(new Date(activePage).getMonth())
        let updatedYear = updatedMonth===12 ? transform(getYear(activePage)) : getYear(activePage) 
        setActivePage(new Date(updatedYear, updatedMonth, 1))
        onClick()
    }
    
    return (
        <Tooltip content={`${transform(new Date(activePage).getMonth())}`}>
             <IconButton
                id={`${name.str}-button-for-${activePage}`}
                className={className}
                size='2'
                variant='ghost'
                onClick={handleNavigation} 
                css={ name.dir==='left' ? { ...leftNavButtonStyles} : {...rightNavButtonStyles }}
            >
                {icon}
            </IconButton> 
        </Tooltip>
    )
}


export const Navbar = ({ onPreviousClick, onNextClick, className }: INavbarProps) => {

    return (
        <>
            <NavButton 
                icon={<ChevronLeftIcon />} 
                onClick={onPreviousClick} 
                className={className}  
                transform={((n: number) => n - 1)}
                name={{ 
                    str: 'prev', 
                    dir: 'left'
                }}
            />
            <NavButton 
                icon={<ChevronRightIcon />} 
                onClick={onNextClick} 
                className={className}  
                transform={((n: number) => n + 1)}
                name={{
                    str: 'next', 
                    dir: 'right'
                }}
            />
        </>
    );
}