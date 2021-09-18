import React from 'react'

import {
    idAtom, 
    nameAtom,
    primaryValueAtom,
    secondaryValueAtom,
    primaryFieldAtom,
    validAtom,
    abTestConfigsAtom,
    selectedAbTestConfigsAtom,
    createAbTestConfigAtom,
    updateAbTestConfigAtom,
    deleteAbTestConfigsAtom
} from '../../../atoms/abtesting'

const nameField = () => {

    return (
        <div>
            
            <input 
                type="text" 
                placeholder="AB Test #__"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </div>
    )
}