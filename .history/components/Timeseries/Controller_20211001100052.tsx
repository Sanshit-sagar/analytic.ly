import React from 'react'

import { useAtom } from 'jotai'

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
import { Toolbar } from '../../primitives/Toolbar'
import { ToolbarButtonGroup, ToolbarSeparator } from '../../primitives/Toolbar'

import SelectMenu from '../../compositions/SelectMenu'
import { ToggleGroup } from '../../compositions/ToggleButtonsGroup'

import { SpaceEvenlyHorizontallyIcon,  CalendarIcon } from '@radix-ui/react-icons'

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

export const Zoom = () => {
    const [zoomIndex, setZoomIndex] = useAtom(clickstreamZoomIndexAtom)
    const zoomValue = useAtomValue(clickstreamZoomTextValueAtom)

    return (
        <ToggleGroup 
            type='single'
            selectedIndex={`${zoomIndex}`}
            setSelectedIndex={(value: number) => setZoomIndex(value || 0)}
            selectedValue={`${zoomIndex}`}
            selectedTextValue={`${zoomValue}`}
            items={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    );
}

export const TimeSelectionGroup = () => (
    <ToolbarButtonGroup>
        <Zoom />
        <ToolbarSeparator />
        <Range />
        <Increments />
    </ToolbarButtonGroup>
)


const Controller = () => {

    return (
        <Toolbar aria-label='Timeseries-controls' css={{ height: 30, border: 'none', boxShadow: 'none', width: '98.5%' }}>
            <TimeSelectionGroup />
        </Toolbar>
    )
}

export default Controller