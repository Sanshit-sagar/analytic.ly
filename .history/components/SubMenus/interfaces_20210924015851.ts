import { WritableAtom } from 'jotai'
import { 
    SortDirectionEnum,
    LoadingStateEnum, 
    ServiceStateEnum,
    UrchinCategoryEnum
} from './constants'

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

interface ServiceInit { 
    status: ServiceStateEnum.INIT; 
};

interface ServiceLoading { 
    status: ServiceStateEnum.LOADING; 
};

interface ServiceLoaded<T> {
    status: ServiceStateEnum.LOADED;
    payload: T;
};

interface ServiceError {
    status: ServiceStateEnum.ERROR;
    error: Error;
};

export type Service<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceError;


export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null; 
    result: SavedUrchin[];
};