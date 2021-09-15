import React from 'react';


import { Tooltip } from '../../primitives/Tooltip'
import { Text } from '../../primitives/Text'
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

import { 
    ZoomInIcon, 
    ZoomOutIcon, ReloadIcon } from '@radix-ui/react-icons'

import { 
    LinearLineIcon, 
    NaturalLineIcon, 
    PiecewiseLineIcon, 
    MonotoneLineIcon 
} from '../icons'

import {
    rangeOptions,
    intervalOptions
} from '../../hooks/useAtomicClicks'
import {
    rangeIndexAtom,
    intervalIndexAtom 
} from '../../pages/index'

import { Atom, atom, useAtom } from 'jotai'

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

const timeseriesZoomIndexAtom = atom(1)
const timeseriesZoomAtom = atom((get) => zoomOptions[get(timeseriesZoomIndexAtom)])

const zoomOptions = [
    { id: 0, value: 'magnify', textValue: 'zoom in', alt: undefined, icon: <ZoomInIcon /> },
    { id: 1, value: 'reduce', textValue: 'zoom out', alt: undefined, icon: <ZoomOutIcon /> },
    { id: 2, value: 'reset', textValue: 'reset', alt: undefined, icon: <ReloadIcon /> },
];

export const Zoom = () => {
    const [zoomIndex, setZoomIndex] = useAtom(timeseriesZoomIndexAtom)
    const zoomDisabled = false

    return (
        <ToggleGroup 
            type='single'
            value={`${zoomIndex}`}
            onValueChange={(value: string) => setZoomIndex(parseInt(value))}
            orientation={'horizontal'}
            dir={'ltr'}
            rovingFocus={true}
            loop={true}
            disabled={zoomDisabled}
            aria-label='zoom-selection-options'
        >
            {zoomOptions.map((zoomOption, index) => (
                <Tooltip content={zoomOption.value.toUpperCase()}>
                    <ToggleGroupButton
                        key={index}
                        value={`${zoomOption.id}`}
                    >
                        {zoomOption.icon}
                    </ToggleGroupButton>
                </Tooltip>
            ))}
        </ToggleGroup>
    )
}

const styleOptions = [
    { id: 0, value: 'linear', textValue: 'polyline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 1, value: 'natural', textValue: 'natural cubic spline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 2, value: 'monotone', textValue: 'cubic spline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 3, value: 'step', textValue: 'piecewise', alt: undefined, icon: undefined, category: 'Curve Type' },
];

const styleIndexAtom = atom(1)

function concatWithSymbol(a: string, b: string, symbol: string) {
    return `${a.toUpperCase()} ${symbol} ${b.toUpperCase()}`
}

export const Styles = () => {
    const [styleIndex, setStyleIndex] = useAtom(styleIndexAtom)
    const stylesDisabled = false

    return (
        <ToggleGroup 
            type='single'
            value={`${styleIndex}`}
            onValueChange={(value: string) => setStyleIndex(parseInt(value))}
            orientation={'horizontal'}
            dir={'ltr'}
            rovingFocus={true}
            loop={true}
            disabled={stylesDisabled}
            aria-label='styling-options'
        >
            {styleOptions.map((sOpt, idx) => (
                <Tooltip content={`${concatWithSymbol(sOpt.value, sOpt.textValue, SLASH)}`}>
                    <ToggleGroupButton
                        key={idx}
                        value={`${sOpt.id}`}
                    >
                        <Text>{sOpt.id}</Text>
                    </ToggleGroupButton>
                </Tooltip>
            ))}
        </ToggleGroup>
        
    )
}

export const TimeSelectionGroup = () => {

    return (
        <ToolbarButtonGroup>
            <Styles />
            <TBAR />
            <Zoom />
            <TBAR />
            <Range />
            <Increments />
        </ToolbarButtonGroup>
    );
}

export const CustomToggleGroup = () => <PresetToggleButtons />

const Timeseries = () => {
    // const [amount] = useAtom(quantityAtom)
    // const [range] = useAtom(timeAgoStrAtom)
    // const [interval] = useAtom(tickSizeStrAtom)

    return (
        <MarketProvider>    
            <ClickHistory /> 
        </MarketProvider>
    );
}

export default Timeseries