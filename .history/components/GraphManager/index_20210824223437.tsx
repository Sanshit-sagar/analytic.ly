import React from 'react';
import { Atom, atom, useAtom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

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

import { useClickHistoryForUser } from '../../hooks/useClicks'
import SelectMenu from './Select'

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


const quantityAtom: Atom<number>  = atom(1)
const timeAgoAtom: Atom<number> = atom(4)
const openTimeAgoAtom: Atom<boolean> = atom(false)
const tickSizeAtom: Atom<number> = atom(0)
const tickSizeActive: Atom<boolean> = atom(false)


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

const timeAgoInMsAtom: Atom<number> = atom((get) => millify(timeAgoOptions[get(timeAgoAtom)].label))
const timeAgoInMsWithQuantityAtom: Atom<number> = atom((get) => quantify(get(timeAgoInMsAtom), get(quantityAtom)))
const tickSizeInMsAtom: Atom<number> = atom((get) => millify(tickSizeOptions[get(tickSizeAtom)].label))
const invalidTickSizeAtom: Atom<boolean> = atom((get) => invalidate(get(tickSizeInMsAtom), get(timeAgoInMsWithQuantityAtom)));
const numIntervalsAtom: Atom<number> = atom((get) => {
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
        <SelectMenu 
             menuName={'Start Time Ago'} 
             openAtom={openTimeAgoAtom} 
             selectedIndexAtom={timeAgoAtom} 
             selectionOptions={timeAgoOptions}
        />
    )
}

const TickSize = () => {

    return (
        <SelectMenu 
           menuName={'Tick Size'} 
           openAtom={tickSizeActive} 
           selectedIndexAtom={tickSizeAtom}
           selectionOptions={tickSizeOptions}
        />
     )
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

const Controls = () => {

    return (
        <Toolbar>
            <Quantity />
            <TimeAgo /> 
            <TickSize />
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    );
}

// const Output = () => {
    // const [timeAgo] = useAtom(timeAgoInMsAtom)
    // const [timeAgoQuant] = useAtom(timeAgoInMsWithQuantityAtom)
    // const [tickSize] = useAtom(tickSizeInMsAtom)
    // const [numIntervals] = useAtom(numIntervalsAtom)

    // return (
        // <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
            {/* <Text size='1'> Start from {timeAgo} [{timeAgoQuant}] </Text> */}
            {/* <Text size='1'> in {tickSize} increments </Text> */}
            {/* <Text size='1'>  = {numIntervals} intervals </Text> */}
        {/* </Flex> */}
    // )
// }

// const ClicksData = ({ amount, range, interval }) => {
    // const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval)
// 
    // if(loading) return <Text> loading... </Text>
    // if(error) return <Text> Error: {error.message} </Text> 
// 
    // let data = clicks;
// 
    // return {
        // <Flex css={{ fd: 'column'', jc: 'flex-start', ai: 'stretch }}> 
            // <Text> {JSON.stringify(data)} </Text>
        // </Flex>
    // }
// }

const ClickHistory = () => {

    
    return (
        <Text> {loading ? 'loading...' : error ? 'error' : `${JSON.stringify(clicks)}` }</Text> 
    )
}

const timeAgoStrAtom = atom((get) => timeAgoOptions[get(timeAgoAtom)].label)
const tickSizeStrAtom = atom((get) => tickSizeOptions[get(tickSizeAtom)].label)
const isValidAtom = atom((get) => get(numIntervalsAtom)>0 ? true : false)

const GraphManager = () => {
    const [amount] = useAtom(quantityAtom)
    const [range] = useAtom(timeAgoStrAtom)
    const [interval] = useAtom(tickSizeStrAtom)
    const [numIntervals] = useAtom(numIntervalsAtom)
    const [valid] = useAtom(isValidAtom)

    const { clicks, loading, error } = useClickHistoryForUser(amount, range, interval)

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
                <Controls />    
                <Text> {amount} | {range} | {interval} | {numIntervals} | {valid.toString()} </Text>
                <ClickHistory />
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    );
}

export default GraphManager