import React, { useMemo } from 'react'
import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Text } from '../../../primitives/Text'

import {
    idAtom, 
    nameAtom,
    primaryValueAtom,
    secondaryValueAtom,
    primaryFieldAtom,
    validAtom,
    abTestConfigsAtom,
    selectedAbTestConfigsAtom,
    AbTestConfigItemAtom,
    createAbTestConfigAtom,
    updateAbTestConfigAtom,
    deleteAbTestConfigAtom
} from '../../../atoms/abtesting'

const Item = ({ itemAtom }: { itemAtom: AbTestConfigItemAtom }) => {
    const [{ id, name, primaryValue, primaryField, valid }] = useAtom(itemAtom)

    const [selected, setSelected] = useAtom(
        useMemo(
            () => 
                atom(
                    (get) => get(selectedAbTestConfigsAtom) === itemAtom,
                    (_get, set) => set(selectedAbTestConfigsAtom, itemAtom)
                ),
            [itemAtom]
        )
    );

    return (
        <Text 
            onClick={setSelected} 
            css={{ color: selected ? '$funkyText' : '$text' }}
        >
            {id}, {name}, {primaryField}: {primaryValue}, {valid}
        </Text>
    )
}

const List = () => {
    const [list] = useAtom(abTestConfigsAtom)

    return (
        {(list.map((item) => {
            <Item   
                key={String(item)}
                itemAtom={item}
        }))}
    )
}

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


const UpdateButton = () => {
    const [enabled, update] = useAtom(updateAbTestConfigAtom)

    return (
        <button disabled={!enabled} onClick={update}>
            Update
        </button>
    )
}

const DeleteButton = () => {
    const [enabled, del] = useAtom(deleteAbTestConfigAtom)

    return (
        <button disabled={!enabled} onClick={del}>
            Delete
        </button>
    )
}



