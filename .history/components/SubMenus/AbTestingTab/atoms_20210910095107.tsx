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
];

const Filter:React.FC = () => {
    const [filter, setFilter] = useAtom(filterAtom)

    const handleChange = (e: React.ChangeEventHandler<HTMLElement>) => {
        setFilter(e.currentTarget.value)
    }

    return (
        <RadioGroup 
            radioItems={radioItems} 
            value={filter} 
            handleChange={handleChange} 
        /> 
    )
}

interface IFilteredProps {
    remove: (id: string) => void;
}

const Filtered: React.FC<IFilteredProps> = ({ remove }) => {

    const [alternates] = useAtom(filteredAtom)
    const transitions = useTransition(alternates, {
        keys: (id: string) => id,
        from: { opacity: 0, height: 0 },
        enter: { opacity: 1, height: 40 },
        leave: { opacity: 0, height: 0 }
    })

    return transitions((style, id) => (
        <a.div className='item' style={style}>
            <AlternateItem 
                id={id} 
                remove={remove} 
            />
        </a.div>
    ));
}

export const AlternatesList = () => {

    const [, setAlternates] = useAtom(alternatesAtom);

    const remove = (id: string) => {
        setAlternates((prev: string[]) => {
            prev.filter((item: string, _: number) => (
                item.id !== id
            ));
        });
        alternateAtomFamily.remove(id);
    }

    const add = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = e.currentTarget.inputTitle.value;
        e.currentTarget.inputTitle.value = "";
        const id = Math.random()
        const url = ''
        const active = true
        alternateAtomFamily({ id, title, url, active })
        setAlternates((prev: IAlternate) => [...prev, id])
    }

    return (
        <form onSubmit={add}>
            <Filter />
            <input name="inputTitle" placeholder="Title" />
            <Filtered remove={remove} />
        </form>
    )
}

