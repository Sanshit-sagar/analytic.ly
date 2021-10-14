import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { intervalAtom } from '../../atoms/timeseries'

import ClickHistory from './ClickHistory'

const Timeseries = () => {
    const interval = useAtomValue(intervalAtom)

    return <ClickHistory interval={interval} />;
}

export default Timeseries