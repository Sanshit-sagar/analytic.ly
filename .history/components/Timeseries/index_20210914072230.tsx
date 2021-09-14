import React from 'react';

import { Select } from '../../compositions/Select'
import { FieldSet } from '../../compositions/FieldSet'
import PresetToggleButtons from '../../compositions/ToggleGroup'

import { getValueInMillis } from '../../lib/utils/d3time'
import { ToolbarButtonGroup } from '../../primitives/Toolbar'

import ClickHistory from './ClickHistory'
import { SelectionOption } from './interfaces'
import MarketProvider from '../../store/MarketProvider'

import SelectMenu from '../../compositions/SelectMenu'

import { 
    quantityAtom, 
    timeAgoAtom, 
    openTimeAgoAtom, 
    tickSizeAtom, 
    tickSizeActive 
} from '../../pages/index'
import { Atom, atom, useAtom } from 'jotai'
// 
const timeAgoOptions: SelectionOption[] = [
    { id: 0, label: 'millisecond' },
    { id: 1, label: 'second' },
    { id: 2, label: 'min' },
    { id: 3, label: 'hour' },
    { id: 4, label: 'day' },
    { id: 5, label: 'week' },
    { id: 6, label: 'month' }
]; 

const tickSizeOptions: SelectionOption[] = [
    { id: 0, label: 'second' },
    { id: 1, label: 'minute' },
    { id: 2, label: 'hour' },
    { id: 3, label: 'day' },
    { id: 4, label: 'week' },
    { id: 5, label: 'month' },
];

function millify(timeDiffStr: string) {
    return getValueInMillis(timeDiffStr) || -1;
}
function quantify(quantity: number | undefined, timeInMs: number | undefined) {
    return ((quantity || 1) * (timeInMs || 1));
}
function invalidate(tickSize: number | undefined, quantifiedTime: number | undefined) {
    return tickSize!==undefined && quantifiedTime!==undefined ? (tickSize > quantifiedTime) : false;
}
function partition(isTickSizeInvalid: boolean, timeAgo: number | undefined, tickSize: number | undefined) {
    return isTickSizeInvalid ? -1 : ((timeAgo || -1)/(tickSize || -1));
}

export const timeAgoInMsAtom: Atom<number> = atom((get) => millify(timeAgoOptions[get(timeAgoAtom)].label))
export const timeAgoInMsWithQuantityAtom: Atom<number> = atom((get) => quantify(get(timeAgoInMsAtom), get(quantityAtom)))
export const tickSizeInMsAtom: Atom<number> = atom((get) => millify(tickSizeOptions[get(tickSizeAtom)].label))
export const invalidTickSizeAtom: Atom<boolean> = atom((get) => invalidate(get(tickSizeInMsAtom), get(timeAgoInMsWithQuantityAtom)));
export const numIntervalsAtom: Atom<number> = atom((get) => {
    return partition(get(invalidTickSizeAtom),get(timeAgoInMsWithQuantityAtom),get(tickSizeInMsAtom)); 
});

export const timeAgoStrAtom = atom((get) => timeAgoOptions[get(timeAgoAtom)].label)
export const tickSizeStrAtom = atom((get) => tickSizeOptions[get(tickSizeAtom)].label)
export const isValidAtom = atom((get) => get(numIntervalsAtom)>0 ? true : false)

export const Quantity = () => {
    return (
        <FieldSet 
             label='Quantity' 
             inputType='number' 
             inputAtom={quantityAtom}
        />
    )
}

const presetOptions = [
    { id: 0, value: 1000 * 60, textValue: 'Minute', alt: undefined, icon: undefined },
    { id: 1, value: 1000 * 60 * 10, textValue: '10 Minutes', alt: undefined, icon: undefined },
    { id: 2, value: 1000 * 60 * 30, textValue: '30 Minutes', alt: undefined, icon: undefined },
    { id: 3, value: 1000 * 60 * 60, textValue: '1 hour', alt: '60 Minutes', icon: undefined },
    { id: 4, value: 1000 * 60 * 60 * 6, textValue: '6 hours', alt: '360 Minutes', icon: undefined },
    { id: 5, value: 1000 * 60 * 60 * 12, textValue: '12 hours', alt: '720 Minutes', icon: undefined },
    { id: 6, value: 1000 * 60 * 60 * 24, textValue: '1 Day', alt: '1440 Minutes (24 hours)', icon: undefined },
    { id: 7, value: 1000 * 60 * 60 * 24 * 7, textValue: '1 Week', alt: '9960 Minutes (156 hours)', icon: undefined },
    { id: 8, value: 1000 * 60 * 60 * 24 * 7 * 30, textValue: '1 Month', alt: '30 days', icon: undefined },
    { id: 9, value: 1000 * 60 * 60 * 24 * 365, textValue: '1 Year', alt: '12 months (356 days)', icon: undefined }
];

const presetIndexAtom = atom(8)

export const Presets = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(presetIndexAtom)

    return (
        <SelectMenu
            selectOnly={true} 
            group={'Presets'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={presetOptions[selectedIndex].textValue}
            selectedTextValue={presetOptions[selectedIndex].textValue}
            items={presetOptions}
        />
    );
}

export const TimeAgo = () => {

    return (
        <Select 
             menuName={'Start Time Ago'} 
             openAtom={openTimeAgoAtom} 
             selectedIndexAtom={timeAgoAtom} 
             selectionOptions={timeAgoOptions}
        />
    )
}


const intervalLengthOptions = [
    { id: 0, value: 1000, textValue: 'second', alt: undefined, icon: undefined },
    { id: 1, value: 1000 * 60, textValue: 'minute',  alt: undefined, icon: undefined  },
    { id: 2, value: 1000 * 60 * 60, textValue: 'hour',  alt: undefined, icon: undefined  },
    { id: 3, value: 1000 * 60 * 60 * 24, textValue: 'day',  alt: undefined, icon: undefined  },
    { id: 4, value: 1000 * 60 * 60 * 24 * 7, textValue: 'week',  alt: undefined, icon: undefined  },
    { id: 5, value: 1000 * 60 * 60 * 60 * 7 * 30, textValue: 'month',  alt: undefined, icon: undefined  }
];

const intervalLengthIndexAtom = atom(1)

export const IntervalLength = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(intervalLengthIndexAtom)

    return (
        <SelectMenu
            selectOnly={true}
            group={'Interval Length'}
            selectedIntex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`${intervalLengthOptions[selectedIndex].value}`}
            selectedTextValue={`${intervalLengthOptions[selectedIndex].textValue}`}
            items={intervalLengthOptions}
        />
    )
}

export const TickSize = () => {

    return (
        <Select 
           menuName={'Tick Size'} 
           openAtom={tickSizeActive} 
           selectedIndexAtom={tickSizeAtom}
           selectionOptions={tickSizeOptions}
        />
     );
}

export const Zoom = () => {

}

export const Curve 

export const TimeSelectionGroup = () => {

    return (
        <ToolbarButtonGroup>
            <IntervalLength />
            <Presets />
        </ToolbarButtonGroup>
    );
}

export const ToggleGroup = () => {

    return (
        <PresetToggleButtons />
    )
}

const Timeseries = () => {
    const [amount] = useAtom(quantityAtom)
    const [range] = useAtom(timeAgoStrAtom)
    const [interval] = useAtom(tickSizeStrAtom)
    // const [isValid] = useAtom(isValidAtom)
    
    return (
        <MarketProvider>    
            <ClickHistory 
                amount={amount} 
                range={range} 
                interval={interval} 
            />
        </MarketProvider>
    );
}

export default Timeseries