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

import SelectMenu from './Select'
import { FieldSet } from '../../compositions/FieldSet'
import { getValueInMillis } from '../../lib/utils/d3time'

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
    { id: 4, label: 'day',},
    { id: 5, label: 'week' },
    { id: 6, label: 'month' }
]; 
const tickSizeOptions = [
    { id: 0, label: 'second' },
    { id: 1, label: 'minute' },
    { id: 2, label: 'hour' },
    { id: 3, label: 'day' },
    { id: 4, label: 'week' },
    { id: 5, label: 'month' },
];

const quantityAtom: Atom<number>  = atom(0)

const Quantity = () => {
    return (
        <FieldSet 
             label='Quantity' 
             inputType='number' 
             inputAtom={quantityAtom}
        />
    )
}

const timeAgoAtom: Atom<number> = atom(0)
const openTimeAgoAtom: Atom<boolean> = atom(false)

const TimeAgo = () => {

    return (
        <SelectMenu 
             menuName={'Range'} 
             openAtom={openTimeAgoAtom} 
             selectedIndexAtom={timeAgoAtom} 
             selectionOptions={timeAgoOptions}
        />
    )
}

const tickSizeAtom: Atom<number> = atom(0)
const tickSizeActive: Atom<boolean> = atom(false)

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
    const handleSubmit = () => {
        alert('Submitting...')
    }

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
    )
}

const timeAgoInMsAtom: Atom<number> = atom((get) => getValueInMillis(timeAgoOptions[get(timeAgoAtom)].label))
const timeAgoInMsWithQuantityAtom: Atom<number> = atom((get) => get(timeAgoInMsAtom) * get(quantityAtom))
const tickSizeInMsAtom: Atom<number> = atom((get) => getValueInMillis(get(tickSizeAtom)))


const Output = () => {
    const [timeAgo] = useAtom(timeAgoInMsAtom)
    const [timeAgoQuant] = useAtom(timeAgoInMsWithQuantityAtom)
    const [tickSize] = useAtom(tickSizeInMsAtom)

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
             <Text size='1'> Start from {timeAgo} [{timeAgoQuant}] </Text>
            <Text size='1'> in {tickSize} increments </Text>
        </Flex>
    )
}

const Timeseries = () => {
    
    QuantityAtom)
    

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
                <Controls />    
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries