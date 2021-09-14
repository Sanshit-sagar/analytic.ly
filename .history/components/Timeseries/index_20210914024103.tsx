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

export const Presets = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(presetIndexAtom)

    return (
        <SelectMenu
            selectOnly={true} 
            group={'Time Ago'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`${timeAgoOptions[selectedIndex].value}`}
            selectedTextValue={timeAgoOptions[selectedIndex].textValue}
            items={timeAgoOptions}
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

export const TimeSelectionGroup = () => {

    return (
        
        <ToolbarButtonGroup>
            <Quantity />
            <TimeAgo /> 
            <TickSize />
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
            {/* <Text size='3' css={{ color: isValid ? 'green' : 'red', mt: '$3', ml: '$2' }}>  */}
                {/* {`FROM: ${amount} ${range}${amount > 1 ? 's' : ''} ago | FOR: every ${interval}`} */}
            {/* </Text> */}
            <ClickHistory 
                amount={amount} 
                range={range} 
                interval={interval} 
            />
        </MarketProvider>
    );
}

export default Timeseries