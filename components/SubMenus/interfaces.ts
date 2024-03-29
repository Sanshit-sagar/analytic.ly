import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'
import { 
    SortDirectionEnum,
    LoadingStateEnum, 
    UrchinCategoryEnum,
    InteractionEnum,
    HoverTypeEnum,
    PointerEnum,
    MenuTriggerActionEnum
} from './constants'

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

export type SortDirection = 
    | SortDirectionEnum.ASC 
    | SortDirectionEnum.DESC

export type LoadingState = 
    | LoadingStateEnum.LOADING 
    | LoadingStateEnum.SORTING 
    | LoadingStateEnum.LOADING_MORE 
    | LoadingStateEnum.ERROR 
    | LoadingStateEnum.IDLE
    | LoadingStateEnum.FILTERING

export type UrchinCategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT

export type CategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE 
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT 
    | UrchinCategoryEnum.NONE

export type HoverType = 
    | HoverTypeEnum.START 
    | HoverTypeEnum.END 
    | HoverTypeEnum.CHANGE 
    | HoverTypeEnum.NONE

export type InteractionType = 
    | InteractionEnum.FOCUS 
    | InteractionEnum.HOVER 
    | InteractionEnum.BLUR 
    | InteractionEnum.CLICK

export type MenuTriggerActionType = 
    | MenuTriggerActionEnum.FOCUS 
    | MenuTriggerActionEnum.INPUT 
    | MenuTriggerActionEnum.MANUAL

export interface SavedUrchin {
    key: Key;
    id: string;
    index: number; 
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

export interface FocusEvent { 
    target: HTMLElement; 
    pointerType: PointerEnum.PEN | PointerEnum.MOUSE; 
    type: HoverTypeEnum.START | HoverTypeEnum.END;
};

export interface AsyncDataPair {
    items: SavedUrchin[]; 
    cursor: string | null; 
}

export interface IUrchinListProps { 
    key: React.Key;
    label: UrchinCategoryType; 
    filterValue: string; 
    setFilterValue: (v: string) => void; 
    endpoint: string | undefined; 
}

export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null; 
    result: SavedUrchin[];
}

export interface HoverDetails {
    isHovered: boolean;
    hoveredParameter: CategoryType;
    hoveredType: HoverType
}

export interface UrchinAtom  { 
    key: React.Key; 
    category: UrchinCategoryType; 
    atom: WritableAtom<string, SetStateAction<string>>;
}
