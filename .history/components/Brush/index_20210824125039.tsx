import React from 'react';
import { atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

import {
    Toolbar,
    ToolbarButton,
    ToolbarSeparator
} from '../../primitives/Toolbar'

import SelectMenu from './Select'
import { FieldSet } from '../../compositions/FieldSet'

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 

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
const selectOpenAtom = atom(false)

const Interval = () => {

    return (
        <SelectMenu 
           menuName={'Interval'} 
           openAtom={selectOpenAtom} 
           selectedIndexAtom={intervalAtom} 
           selectedStrAtom={intervalStrAtom} 
           selectionOptions={intervalOptions}
        />
    )
}

const Retry = () => {
    const handleClick = () => {
        alert('Retrying'); 
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

const Controls = () => {

    return (
        <Toolbar>
            <Amount />
            <Interval />
            
            <ToolbarSeparator />
            <Retry /> 
        </Toolbar>
    )
}


const Timeseries:React.FC = () => {

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
                <Controls />    
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries