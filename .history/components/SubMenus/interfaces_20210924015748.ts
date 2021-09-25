import { 
    SortDirectionEnum,
    LoadingStateEnum, 
    ServiceStateEnum
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