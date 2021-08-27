import React from 'react';
import { atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

import {
    Toolbar,
    ToolbarButtonGroup,
    ToolbarButton,
    ToolbarSeparator
} from '../../primitives/Toolbar'

import SelectMenu from './Select'
import { FieldSet } from '../../compositions/FieldSet'

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 
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
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const intervalActiveAtom = atom(false)

const Interval = () => {

    return (
        <SelectMenu 
           menuName={'Interval'} 
           openAtom={intervalActiveAtom} 
           selectedIndexAtom={intervalAtom} 
           selectedStrAtom={intervalStrAtom} 
           selectionOptions={intervalOptions}
        />
    )
}

const rangeAtom = atom(0)
const rangeStrAtom = atom((get) => rangeOptions[get(rangeAtom)])
const rangeActiveAtom = atom(false)

const Range = () => {

    return (
        <SelectMenu 
             menuName={'Range'} 
             openAtom={rangeActiveAtom} 
             selectedIndexAtom={rangeAtom} 
             selectedStrAtom={rangeStrAtom} 
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
        <StyledButtonGroup>
            <Reset />
            <Submit /> 
        </StyledButtonGroup>
    )
}

const Controls = () => {

    return (
        <Toolbar>
            <Amount />
            <Interval />
            <Range /> 
            
            <ToolbarSeparator />
            
            
            
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