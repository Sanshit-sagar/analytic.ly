import React from 'react';
import { atom } from 'jotai'

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

const intervalOptions = [
    { id: 0, label: 'millisecond', 
    { id: 1, label: 'second', 
    { id: 2, label: 'min', 
    { id: 3, label: 'hour', 
    { id: 4, label: 'day', 
    { id: 5, label: 'week', 
    { id: 6, label: 'month', value: 0, shortened: 'month' }
]; 
const rangeOptions = ['minute', 'hour', 'day', 'week', 'month']

const amountAtom  = atom(0)

const Amount = () => {
    return (
        <FieldSet 
             label='Amount' 
             inputType='number' 
             inputAtom={amountAtom}
        />
    )
}

const intervalAtom = atom(0)
const intervalActiveAtom = atom(false)

const Interval = () => {

    return (
        <SelectMenu 
           menuName={'Interval'} 
           openAtom={intervalActiveAtom} 
           selectedIndexAtom={intervalAtom}
           selectionOptions={intervalOptions}
        />
    )
}

const rangeAtom = atom(0)
const rangeActiveAtom = atom(false)

const Range = () => {

    return (
        <SelectMenu 
             menuName={'Range'} 
             openAtom={rangeActiveAtom} 
             selectedIndexAtom={rangeAtom} 
             selectionOptions={rangeOptions}
        />
    )
}

const Reset = () => {
    const handleClick = () => {
        alert('Resetting'); 
    }

    return (
        <ToolbarButton
            as='button' 
            css={{ marginLeft: 'auto' }}
            onClick={handleClick}
        >
            Retry
        </ToolbarButton>
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
                <Reset />
                <Submit /> 
            </ToolbarButtonGroup>
        </Flex>
    )
}

const Controls = () => {

    return (
        <Toolbar>
            <Amount />
            <Range /> 
            <Interval />
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    )
}


const Timeseries = () => {

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
                <Controls />    
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries