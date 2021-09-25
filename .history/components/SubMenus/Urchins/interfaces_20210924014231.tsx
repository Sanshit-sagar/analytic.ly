import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'

export interface UrchinAtom  { 
    key: Key; 
    category: UrchinCategoryType; 
    atom: WritableAtom<string, SetStateAction<string>>;
}

export interface AsyncDataPair {
    items: SavedUrchin[]; 
    cursor: string | null; 
};

// export interface ServiceInit { status: ServiceStateEnum.INIT; }
// export interface ServiceLoading { status: ServiceStateEnum.LOADING; }
// export interface ServiceLoaded<T> {
//     status: ServiceStateEnum.LOADED;
//     payload: T;
// }
// export interface ServiceError {
//     status: ServiceStateEnum.ERROR;
//     error: Error;
// }
// export type Service<T> =
//   | ServiceInit
//   | ServiceLoading
//   | ServiceLoaded<T>
//   | ServiceError;

export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null; 
    result: IUrchin[];
}
