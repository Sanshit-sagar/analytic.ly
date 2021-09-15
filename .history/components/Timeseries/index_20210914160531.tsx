import React from 'react'

import { atom, useAtom } from 'jotai'

import { 
    ToggleGroupButton, 
    ToggleGroup 
} from '../../primitives/Toggle'
import { 
    ToolbarButtonGroup, 
    ToolbarSeparator as TBAR 
} from '../../primitives/Toolbar'

import ClickHistory from './ClickHistory'
import SelectMenu from '../../compositions/SelectMenu'
import PresetToggleButtons from '../../compositions/ToggleGroup'
// 
// import { 
    // ZoomInIcon, 
    // ZoomOutIcon, 
    // ReloadIcon 
// } from '@radix-ui/react-icons'
// import { 
    // LinearLineIcon, 
    // NaturalLineIcon, 
    // PiecewiseLineIcon, 
    // MonotoneLineIcon 
// } from '../icons'

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