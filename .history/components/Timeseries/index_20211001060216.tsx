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

import ClickHistory from './ClickHistory'
import SelectMenu from '../../compositions/SelectMenu'
import { ToggleGroup } from '../../compositions/ToggleButtonsGroup'
import { ToolbarButtonGroup, ToolbarSeparator as TBAR } from '../../primitives/Toolbar'


export const Range = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(rangeIndexAtom)

    return (
        <SelectMenu
            selectOnly={true} 
            group={'Presets'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={rangeOptions[selectedIndex].textValue}
            selectedTextValue={rangeOptions[selectedIndex].textValue}
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
            selectedIntex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`${intervalOptions[selectedIndex].value}`}
            selectedTextValue={
                <>
                <SpaceEvenlyHorizontallyIcn /> 
                <Text size='1'>{intervalOptions[selectedIndex].textValue}`}
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
            items ={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    );
}

export const TimeSelectionGroup = () => {

    return (
        <ToolbarButtonGroup>
            <Zoom />
            <TBAR />
            <Range />
            <Increments />
        </ToolbarButtonGroup>
    );
}

const Timeseries = () => <ClickHistory /> 

export default Timeseries