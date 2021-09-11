import React from 'react' 

import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { a, useTransition } from '@react-spring/web'

type Alternate = {
    id: string;
    title?: string;
    url: string;
    active: boolean; 
}

interface IAlternateItemProps {
    id: string; 
    remove: (id: string) => void;
};

const alternateAtomFamily = atomFamily(
    (alternate: Alternate) => ({ title: alternate.id || 'No title', active: true }),
    null,
    (a: Alternate, b: Alternate) => a.id === b.id,
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
    
}