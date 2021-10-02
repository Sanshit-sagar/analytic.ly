import React from 'react'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import {
    zoomOptions,
    rangeOptions,
    rangeIndexAtom,
    intervalOptions,
    intervalIndexAtom,
    clickstreamZoomIndexAtom,
    clickstreamZoomTextValueAtom
} from '../../atoms/timeseries'
import { intervalAtom } from '../../atoms/timeseries'

import { Text } from '../../primitives/Text'
import SelectMenu from '../../compositions/SelectMenu'
import { ToggleGroup } from '../../compositions/ToggleButtonsGroup'
import { ToolbarButtonGroup, ToolbarSeparator as TBAR } from '../../primitives/Toolbar'

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