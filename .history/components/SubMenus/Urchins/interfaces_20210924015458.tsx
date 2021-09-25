import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'
import {
    UrchinCategoryEnum,

    IUrchin,
    UrchinCategoryType,
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