import React from 'react'
import { useAtom } from 'jotai'

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

const NameField = () => {
    const [value, setValue] = useAtom(nameAtom)

    return (
        <div>
            <span> Name: </span>
            <input 
                type="text" 
                placeholder="AB Test #__"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </div>
    )
}

const PrimaryValueField = () => {
    const [value, setValue] = useAtom(primaryF)
}