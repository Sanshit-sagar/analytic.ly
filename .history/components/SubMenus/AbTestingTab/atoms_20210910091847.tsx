import React from 'react' 

import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '../../../primitives/IconButton'

import { RadioGroup } from '../../../compositions/RadioGroup'

import { a, useTransition } from '@react-spring/web'

type IAlternate = {
    id: string;
    title?: string;
    url: string;
    active: boolean; 
}

interface IAlternateItemProps {
    id: string; 
    remove: (id: string) => void;
};

const alternateAtomFamily = atomFamily<IAlternate>(
    (alternate: IAlternate) => ({ title: alternate.id || 'No title', active: true }),
    null,
    (a: IAlternate, b: IAlternate) => a.id === b.id,
); 

const filterAtom = atom('all')
const alternatesAtom = atom<string[]>([]);
const filteredAtom = atom<string[]>((get) => {
    const filter = get(filterAtom);
    const alternates = get(alternatesAtom);
    if(filter === 'all') return alternates; 
    else if(filter=== 'active') 
        return alternates.filter((id: string) => get(alternateAtomFamily({ id })).active);
    else return alternates.filter((id: string) => !get(alternateAtomFamily({ id })).active);
}); 


const AlternateItem:React.FC<IAlternateItemProps> = ({ id, remove }) => {
    const [item, setItem] = useAtom<IAlternate>(alternateAtomFamily({ id }))
    const toggleActive = () => setItem({ ...item, active: !item.active });

    return (
        <>
            <input type="checkbox" checked={item?.active} onChange={toggleActive} />
            <span style={{ textDecoration: item?.active ? "line-through" : "" }}>
                {item?.title}
            </span>
            <IconButton onClick={() => remove(id)}>
                <Cross2Icon /> 
            </IconButton>
        </>
    )
}

const radioItems = [
    { label: 'all', value: 'all' },
    { label: 'active', value: 'active' },
    { label: 'inactive', value: 'inactive' }
]

const Filter:React.FC = () => {
    const [filter, setFilter] = useAtom(filterAtom)
    return (

    )
}