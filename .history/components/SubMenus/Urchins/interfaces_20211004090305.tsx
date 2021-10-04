import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'

export enum UrchinCategoryEnum {
    MEDIUM = 'medium',
    TERM = 'term',
    SOURCE = 'source',
    CONTENT = 'content',
    CAMPAIGN = 'campaign'
}

export type UrchinCategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT


export interface SavedUrchin {
    key: React.Key;
    id: string;
    category: string;
    name: string; 
    frequency: number; 
    updatedAt: Date; 
    createdAt: Date; 
    slugs: string[]; 
}

export interface UrchinAtom  { 
    key: React.Key; 
    category: UrchinCategoryType; 
    atom: WritableAtom<string, SetStateAction<string>>;
}

export interface AsyncDataPair {
    items: SavedUrchin[]; 
    cursor: string | null; 
}

export interface IUrchinListProps { 
    key: React.Key;
    label: UrchinCategoryType; 
    atom: PrimitiveAtom<string>
    endpoint: string | undefined; 
}
// AsyncDataPair, 
// SavedUrchin, 
// UrchinAtom, 
// UrchinCategoryType
// IUrchinListProps,