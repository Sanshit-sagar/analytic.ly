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
    clickstreamZoomTextValueAtom,
    statisticOptions,
    statisticIndexAtom,
    numWindowsAtom,
    windowSizeAtom
} from '../../atoms/timeseries'

import { Text } from '../../primitives/Text'
import { Toolbar } from '../../primitives/Toolbar'
import { ToolbarButtonGroup, ToolbarSeparator } from '../../primitives/Toolbar'

import SelectMenu from '../../compositions/SelectMenu'
import { ToggleGroup } from '../../compositions/ToggleButtonsGroup'

import { 
    SpaceEvenlyHorizontallyIcon, 
    CalendarIcon, 
    BarChartIcon 
} from '@radix-ui/react-icons'

export const Range = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(rangeIndexAtom)

    return (
        <SelectMenu
            selectOnly={true} 
            group={'Presets'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={rangeOptions[selectedIndex].textValue}
            selectedTextValue={<><CalendarIcon /> <Text> {rangeOptions[selectedIndex].textValue} </Text></>}
            items={rangeOptions}
        />
    );
}

export const Increments = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(intervalIndexAtom)

    return (
        <SelectMenu
            selectOnly={true}
            group={'Interval Length'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`${intervalOptions[selectedIndex].value}`}
            selectedTextValue={<><SpaceEvenlyHorizontallyIcon /> <Text> {intervalOptions[selectedIndex].textValue} </Text></>}
            items={intervalOptions}
        />
    )
}

export const Statistic = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(statisticIndexAtom)

    return (
        <SelectMenu
            selectOnly={true}
            group={'Statistic Selector'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`statisticOptions[selectedIndex].value`}
            selectedTextValue={<><BarChartIcon /><Text> {statisticOptions[selectedIndex].value}</Text></>}
            items={statisticOptions}
        />
    )
}

export const Zoom = () => {
    const [zoomIndex, setZoomIndex] = useAtom(clickstreamZoomIndexAtom)

    return (
        <ToggleGroup 
            type='single'
            selectedIndex={`${zoomIndex}`}
            setSelectedIndex={(value: number) => setZoomIndex(value || 0)}
            selectedValue={`${zoomIndex}`}
            selectedTextValue={`${zoomOptions[zoomIndex].value}`}
            items={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    );
}

const Controller = () => {

    return (
        <Toolbar aria-label='Timeseries-controls'>
            <ToolbarButtonGroup>
                <Statistic />
                <ToolbarSeparator />
                <Zoom />
                <ToolbarSeparator />
                <Range />
                <Increments />
            </ToolbarButtonGroup>
        </Toolbar>
    )
}

export default Controller