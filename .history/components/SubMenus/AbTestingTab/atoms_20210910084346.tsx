import React, { useState } from 'react' 

import { Provider, atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { a, useTransition } from '@react-spring/web'

type Alternate {
    id: string;
    title?: string;
    url: string;
}

const alternateAtomFamily = atomFamily(
    (alternate: Alternate) => ({ title: alternate.id || 'No title', completed: false }),
    null,
    (a: Alternate, b: Alternate) => a.id === b.id,
); 

const filterAtom = atom('all')
const alternatesAtom = atom<string[]>([]);
const filteredAtom = atom((get) => {
    const filter = get(filterAtom);
    const alternates = get(alternatesAtom);
    if(filter === 'all')
)