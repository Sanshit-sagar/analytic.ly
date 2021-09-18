import React, { useMemo } from 'react'
import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { ControlGroup, Label, LargeInput as Input } from '../../../primitives/FieldSet'
import { Button } from '../../../primitives/Button'

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

import { Tree } from '../../../compositions/Tree'

import {
    TreeContainer,
    TreeNodeWithInput
} from '../../../primitives/Tree'

const Item = ({ itemAtom }: { itemAtom: AbTestConfigItemAtom }) => {
    const [{ id, name, primaryValue, primaryField, valid }] = useAtom(itemAtom)

    const [selected, setSelected] = useAtom(
        useMemo(() => atom(
            (get) => get(selectedAbTestConfigsAtom) === itemAtom,
            (_get, set) => set(selectedAbTestConfigsAtom, itemAtom)
        ), [itemAtom])
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
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1', overflowY: 'scroll', height: '10em', width: '100%', border: '1px solid $border' }}>
            {list.map((item: AbTestConfigItemAtom) => (
                <Item   
                    key={String(item)}
                    itemAtom={item}
                />
            ))}
        </Flex>
    )
}

const NameField = () => {
    const [value, setValue] = useAtom(nameAtom)

    return (
        <ControlGroup>
            <Label> Name: </Label>
            <Input 
                type="text" 
                placeholder="AB Test #__"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </ControlGroup>
    )
}

const PrimaryValueField = () => {
    const [value, setValue] = useAtom(primaryValueAtom)
    const primaryField = useAtomValue(primaryFieldAtom)

    return (
        <ControlGroup>
            <Label> URL: </Label>
            <Input 
                type='url'
                placeholder='URL for test config'
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </ControlGroup>
    );
}

const SecondaryValueField = () => {
    const [value, setValue] = useAtom(secondaryValueAtom)

    return (
        <ControlGroup>
            <Label> Cookie: </Label>
            <Input
                type='password'
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </ControlGroup> 
    )
}

const CreateButton = () => {
    const [enabled, create] = useAtom(createAbTestConfigAtom)

    return (
        <Button disabled={!enabled} onClick={create}>
            Create
        </Button>
    )
}


const UpdateButton = () => {
    const [enabled, update] = useAtom(updateAbTestConfigAtom)

    return (
        <Button disabled={!enabled} onClick={update}>
            Update
        </Button>
    )
}

const DeleteButton = () => {
    const [enabled, del] = useAtom(deleteAbTestConfigAtom)

    return (
        <Button disabled={!enabled} onClick={del}>
            Delete
        </Button>
    )
}




export const AbTestingTree = () => {

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$1'}}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1' }}>
                <Flex css={{ width: '45%', fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                    <List />
                </Flex>
                <Flex css={{ fd: 'row', jc: 'space-evenly', ai: 'flex-end', width: "45%", margin: "auto" }}>
                    {/* <NameField /> */}
                    <PrimaryValueField />
                    <SecondaryValueField />
                </Flex>
            </Flex>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-evenly', ai: 'flex-start', gap: '$2' }}>
                <CreateButton />
                <UpdateButton />
                <DeleteButton />
            </Flex>
        </Flex>
    )
}

