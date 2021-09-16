import { useAtom } from 'jotai'
import { IconButton } from '../../../primitives/IconButton'


import { monthAtom, yearAtom } from './index'


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