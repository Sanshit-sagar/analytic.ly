import React from 'react';
import { Atom, atom, useAtom } from 'jotai'
import MarketProvider from '../../store/MarketProvider'
import { GraphContainer } from '../../primitives/Shared'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import {
    Toolbar,
    ToolbarButton,
    ToolbarSeparator,
    ToolbarButtonGroup
} from '../../primitives/Toolbar'

import { getValueInMillis } from '../../lib/utils/d3time'
import { FieldSet } from '../../compositions/FieldSet'
import { Select } from '../../compositions/Select'
import ClickHistory from './ClickHistory'

import PresetToggleButtons from '../../compositions/ToggleGroup'

export type SelectionValue = number | string;

export interface SelectionOption {
    id: number;
    label: string;
}

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


export const quantityAtom: Atom<number>  = atom(2)
export const timeAgoAtom: Atom<number> = atom(5)
export const openTimeAgoAtom: Atom<boolean> = atom(false)
export const tickSizeAtom: Atom<number> = atom(3)
export const tickSizeActive: Atom<boolean> = atom(false)


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


const Quantity = () => {
    return (
        <FieldSet 
             label='Quantity' 
             inputType='number' 
             inputAtom={quantityAtom}
        />
    )
}

const TimeAgo = () => {

    return (
        <Select 
             menuName={'Start Time Ago'} 
             openAtom={openTimeAgoAtom} 
             selectedIndexAtom={timeAgoAtom} 
             selectionOptions={timeAgoOptions}
        />
    )
}

const TickSize = () => {

    return (
        <Select 
           menuName={'Tick Size'} 
           openAtom={tickSizeActive} 
           selectedIndexAtom={tickSizeAtom}
           selectionOptions={tickSizeOptions}
        />
     );
}

const Submit = () => {
    const handleSubmit = () => alert('Submitting...')

    return (
        <ToolbarButton
            as='button'
            css={{ marginLeft: 'auto' }}
            onClick={handleSubmit}
        >
            Submit
        </ToolbarButton>
    )
}

const Actions = () => {

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            <Text size='1'> Actions </Text>
            <ToolbarButtonGroup>
                <Submit /> 
            </ToolbarButtonGroup>
        </Flex>
    )
}


const ToggleGroup = () => {

    const presets = [
        { id: '1d', index: 0, label: 'Past 1 Day', value: '/1/day' },
        { id: '2d', index: 1, label: 'Past 2 Days', value: '/2/day' },
        { id: '5d', index: 2, label: 'Past 5 Days', value: '/5/day' },
        { id: '1w', index: 3, label: 'Past 1 Week', value: '/1/week' },
        { id: '1m', index: 4, label: 'Past 1 Month', value: '/1/month' },
        { id: '3m', index: 5, label: 'Past 3 Months', value: '/3/month' },
        { id: '1y', index: 6, label: 'Past 1 Year', value: '/1/year' },
    ];
        

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'space-between', gap: '$1'}}> 
            <Text size='1'> Presets </Text> 
             <PresetToggleButtons
                 presets={presets}
                 value={'1d'}
             />
        </Flex>
    )
}

const DarkMode = ({ toggleTheme }) => {
    return (
        <ToolbarToggleGroup type='single' value={}
    )
}

const Controls = ({ toggleTheme }) => {

    return (
        <Toolbar>
            <Quantity />
            <TimeAgo /> 
            <TickSize />
            <ToolbarSeparator />
            <ToggleGroup /> 
            <ToolbarSeparator />
            <Actions />
            <ToolbarSeparator />
            <DarkMode />
        </Toolbar>
    );
}

export const timeAgoStrAtom = atom((get) => timeAgoOptions[get(timeAgoAtom)].label)
export const tickSizeStrAtom = atom((get) => tickSizeOptions[get(tickSizeAtom)].label)
export const isValidAtom = atom((get) => get(numIntervalsAtom)>0 ? true : false)

const GraphManager = ({ toggleTheme }) => {
    const [amount] = useAtom(quantityAtom)
    const [range] = useAtom(timeAgoStrAtom)
    const [interval] = useAtom(tickSizeStrAtom)
    const [isValid] = useAtom(isValidAtom)
    
    return (
        <MarketProvider>
            <GraphContainer> 
                <Controls toggleTheme={toggleTheme} />    
                <Text size='3' css={{ color: isValid ? 'green' : 'red', mt: '$3', ml: '$2' }}> 
                    {`FROM: ${amount} ${range}${amount > 1 ? 's' : ''} ago | FOR: every ${interval}`}
                </Text>
                <ClickHistory 
                    amount={amount} 
                    range={range} 
                    interval={interval} 
                />
            </GraphContainer>
        </MarketProvider>
    );
}

export default GraphManager