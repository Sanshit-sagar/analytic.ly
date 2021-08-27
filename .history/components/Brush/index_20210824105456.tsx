import React from 'react';
import { atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

import {
    Toolbar,
    ToolbarButton,
    ToolbarSeparator,
    ToolbarToggleGroup, 
    ToolbarToggleItem
} from '../../primitives/Toolbar'

import SelectMenu from './Select'
import NumberInput from './NumberInput'

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 
const toolbarOptions = [
    { id: 0, label: 'B'}
]

const amountAtom  = atom(0)
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))

const intervalAtom = atom(0)
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const selectOpenAtom = atom(false)

const ToolbarMenu = () => {

    return (
        <Toolbar>
            <ToolbarToggleGroup
                type="single"
            />
                {toolbarOptions.map((toolbarOption: string, index: number) => {
                    return (
                        <ToolbarToggleItem value={toolbarOptions[index].value}>

                            {toolbarOption}
                        </ToolbarToggleItem>
                    )
                })}

            </ToolbarToggleGroup> 
        </Toolbar>
    )
}




const Timeseries:React.FC = () => {

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
           
                <NumberInput 
                    inputAtom={amountAtom}
                    inputNumberAtom={amountNumberAtom}
                />
                <SelectMenu 
                    menuName={'Interval'} 
                    openAtom={selectOpenAtom} 
                    selectedIndexAtom={intervalAtom} 
                    selectedStrAtom={intervalStrAtom} 
                    selectionOptions={intervalOptions}
                />
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries