import React from 'react'

import {useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import ClickHistory from './ClickHistory'
import { ToolbarButtonGroup}
import SelectMenu from '../../compositions/SelectMenu'
import PresetToggleButtons from '../../compositions/ToggleGroup'
import { ToggleGroup } from '../../compositions/ToggleButtonsGroup'

import {
    zoomOptions,
    clickstreamZoomIndexAtom,
    clickstreamZoomTextValueAtom
} from '../../atoms/clickstream'
import {
    rangeOptions,
    intervalOptions
} from '../../hooks/useAtomicClicks'
import {
    rangeIndexAtom,
    intervalIndexAtom 
} from '../../pages/index'

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
            selectedTextValue={`${intervalOptions[selectedIndex].textValue}`}
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
            setSelectedIndex={(value: number) => setZoomIndex(parseInt(`${value}`))}
            selectedValue={`${zoomIndex}`}
            selectedTextValue={`${zoomValue}`}
            items ={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    )
}






export const TimeSelectionGroup = () => {

    return (
        <ToolbarButtonGroup>
            <Range />
            <Increments />
        </ToolbarButtonGroup>
    );
}

export const CustomToggleGroup = () => <PresetToggleButtons />

const Timeseries = () => <ClickHistory /> 

export default Timeseries