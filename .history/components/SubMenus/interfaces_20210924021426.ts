import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'
import { 
    SortDirectionEnum,
    LoadingStateEnum, 
    ServiceStateEnum,
    UrchinCategoryEnum,
    InteractionEnum,
    HoverTypeEnum,
    PointerEnum
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

export type Service<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceError;

type CategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE 
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT 
    | UrchinCategoryEnum.NONE

type HoverType = 
    | HoverTypeEnum.START 
    | HoverTypeEnum.END 
    | HoverTypeEnum.CHANGE 
    | HoverTypeEnum.NONE

type InteractionType = 
    | InteractionEnum.FOCUS 
    | InteractionEnum.HOVER 
    | InteractionEnum.BLUR 
    | InteractionEnum.CLICK

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
    key: Key;
    label: UrchinCategoryType; 
    filterValue: string; 
    setFilterValue: (v: string) => void; 
    endpoint: string | undefined; 
}

export interface IUrchinListProps { 
    key: Key;
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
};

export interface UrchinAtom  { 
    key: Key; 
    category: UrchinCategoryType; 
    atom: WritableAtom<string, SetStateAction<string>>;
}

export interface AsyncDataPair {
    items: SavedUrchin[]; 
    cursor: string | null; 
}

export interface ServiceInit { 
    status: ServiceStateEnum.INIT; 
};

export interface ServiceLoading { 
    status: ServiceStateEnum.LOADING; 
};

export interface ServiceLoaded<T> {
    status: ServiceStateEnum.LOADED;
    payload: T;
};

export interface ServiceError {
    status: ServiceStateEnum.ERROR;
    error: Error;
}

export interface HoverDetails {
    isHovered: boolean;
    hoveredParameter: CategoryType;
    hoveredType: HoverType
}
