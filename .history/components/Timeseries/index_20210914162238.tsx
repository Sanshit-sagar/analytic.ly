import React from 'react'

import {useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import ClickHistory from './ClickHistory'
import SelectMenu from '../../compositions/SelectMenu'
import PresetToggleButtons from '../../compositions/ToggleGroup'
import {
    clickstreamZoomIndexAtom,
    clickstream
}
import {
    rangeOptions,
    intervalOptions
} from '../../hooks/useAtomicClicks'
import {
    rangeIndexAtom,
    intervalIndexAtom 
} from '../../pages/index'

const SLASH = '/'

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
    const [zoomIndex, setZoomIndex] = useAtom(timeseriesZoomIndexAtom)
    const zoomValue = useAtomValue(timeseriesZoomTextValueAtom)

    return (
        <ToggleButtonsGroup 
            type='single'
            selectedIndex={`${zoomIndex}`}
            setSelectedIndex={(value: string) => setZoomIndex(parseInt(value))}
            selectedValue={`${zoomIndex}`}
            selectedTextValue={zoomValue}
            items ={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    )''
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