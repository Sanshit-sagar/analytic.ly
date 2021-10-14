import React from 'react'

import { useAtomValue } from 'jotai/utils'

import ClickHistory from './ClickHistory'
import { intervalAtom } from '../../atoms/timeseries'

const Timeseries = () => {
    const interval = useAtomValue(intervalAtom)

    return (
        <ClickHistory interval={interval}
        /> 
    ); 
}

export default Timeseries