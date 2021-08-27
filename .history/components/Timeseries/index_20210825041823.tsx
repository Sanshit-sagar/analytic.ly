import React, { useState } from 'react'
import { PrimitiveAtom, Atom, useAtom, atom } from 'jotai'

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


export const quantityAtom: Atom<number>  = atom(1)
export const timeAgoAtom: Atom<number> = atom(4)
export const openTimeAgoAtom: Atom<boolean> = atom(false)
export const tickSizeAtom: Atom<number> = atom(2)
export const tickSizeActive: Atom<boolean> = atom(false)


function millify(timeDiffStr: string) {
    return getValueInMillis(timeDiffStr) || -1;
}
function quantify(quantity: number | undefined, timeInMs: number | undefined) {
    return ((quantity || 1) * (timeInMs || 1));
}
function invalidate(tickSize: number | undefined, quantifiedTime: number | undefined) {
    return tickSize!==undefined && quantifiedTime!==undefined ? (tickSize > quantifiedTime);
}
function partition(isTickSizeInvalid: boolean, timeAgo: number | undefined, tickSize: number | undefined) {
    return isTickSizeInvalid ? -1 : ((timeAgo || -1)/(tickSize || -1));
}

export const timeAgoInMsAtom: Atom<number> = atom((get) => millify(timeAgoOptions[
export const timeAgoInMsWithQuantityAtom: Atom<number> = atom((get) => quantify(ge
export const tickSizeInMsAtom: Atom<number> = atom((get) => millify(tickSizeOption
export const invalidTickSizeAtom: Atom<boolean> = atom((get) => invalidate(get(tic
(timeAgoInMsWithQuantityAtom)));
export const numIntervalsAtom: Atom<number> = atom((get) => {
    return partition(get(invalidTickSizeAtom),get(timeAgoInMsWithQuantityAtom),get
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
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}
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

export const timeAgoStrAtom = atom((get) => timeAgoOptions[get(timeAgoAtom)].label
export const tickSizeStrAtom = atom((get) => tickSizeOptions[get(tickSizeAtom)].la
export const isValidAtom = atom((get) => get(numIntervalsAtom)>0 ? true : false)

const GraphManager = () => {
    const [amount] = useAtom(quantityAtom)
    const [range] = useAtom(timeAgoStrAtom)
    const [interval] = useAtom(tickSizeStrAtom)
    // const [numIntervals] = useAtom(numIntervalsAtom)
    // const [valid] = useAtom(isValidAtom)

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
                <Controls />    
                <p> {amount} | {range} | {interval} </p>
                <ClickHistory 
                    quantity={amount} 
                    timeAgo={range} 
                    tickSize={interval} 
                />
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    );
}


const Timeseries = () => {
    const []
    return (
        <>
            <h1> hihihi </h1>

        </>

    )
}

export default Timeseries 