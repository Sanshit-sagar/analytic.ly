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
        <input 
            type="text" 
            placeholder=""
    )
}