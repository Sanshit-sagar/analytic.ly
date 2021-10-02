import React from 'react'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'


import ClickHistory from './ClickHistory'

import { 
    SpaceEvenlyHorizontallyIcon, 
    CalendarIcon 
} from '@radix-ui/react-icons'

const Timeseries = () => {
    const interval = useAtomValue(intervalAtom)

    return (
        <ClickHistory 
            interval={interval}
        /> 
    ); 
}

export default Timeseries