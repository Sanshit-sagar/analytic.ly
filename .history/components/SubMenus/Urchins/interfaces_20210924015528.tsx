import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'
import {
    UrchinCategoryEnum,

    IUrchin,
    UrchinCategoryType,
} from ''

export interface SavedUrchin {
    key: Key;
    id: string;
    category: string;
    name: string; 
    frequency: number; 
    updatedAt: Date; 
    createdAt: Date; 
    slugs: string[]; 
}

export interface UrchinAtom  { 
    key: Key; 
    category: UrchinCategoryType; 
    atom: WritableAtom<string, SetStateAction<string>>;
}

export interface AsyncDataPair {
    items: SavedUrchin[]; 
    cursor: string | null; 
}

export interface IUrchinListProps { 
    key: Key;
    label: UrchinCategoryType; 
    filterValue: string; 
    setFilterValue: (v: string) => void; 
    endpoint: string | undefined; 
}




// AsyncDataPair, 
// SavedUrchin, 
// UrchinAtom, 
// UrchinCategoryType
// IUrchinListProps,