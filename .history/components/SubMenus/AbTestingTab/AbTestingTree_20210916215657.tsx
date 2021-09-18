import React from 'react'
import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
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
    const [value, setValue] = useAtom(primaryValueAtom)
    const primaryField = useAtomValue(primaryFieldAtom)

    return (
        <div>
            <span> {primaryField}: </span>
            <input 
                type='url'
                placeholder='URL for test config'
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </div>
    );
}

const SecondaryValueField = () => {
    const [value, setValue] = useAtom(secondaryValueAtom)

    return (
        <div>
            <span> Cookie: </span>
            <input
                type='password'
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </div> 
    )
}

const CreateButton = () => {
    const [enabled, create] = useAtom(createAbTestConfigAtom)

    return (
        <button disabled={!enabled} onClick={create}>
            Create
        </button>
    )
}

