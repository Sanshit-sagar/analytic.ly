

export interface UrchinAtom  { 
    key: Key; 
    category: UrchinCategoryType; 
    atom: WritableAtom<string, React.SetStateAction<string>>;
}

export enum UrchinCategoryEnum {
    MEDIUM = 'medium',
    SOURCE = 'source',
    TERM = 'term',
    CAMPAIGN = 'campaign',
    CONTENT = 'content'
}

export type UrchinCategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT


export interface IUrchin {
    id: string; 
    category: UrchinCategoryType; 
    name: string; 
    frequency: number; 
    updatedAt: Date;
    createdAt: Date; 
}

export interface IUrchinListProps { 
    key: Key;
    label: UrchinCategoryType; 
    filterValue: string; 
    setFilterValue: (v: string) => void; 
    endpoint: string; 
}

export enum ServiceStateEnum {
    INIT ='init',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}

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

export interface AsyncDataPair {
    items: SavedUrchin[]; 
    cursor: string | null; 
};

export interface ServiceInit { status: ServiceStateEnum.INIT; }
export interface ServiceLoading { status: ServiceStateEnum.LOADING; }
interface ServiceLoaded<T> {
    status: ServiceStateEnum.LOADED;
    payload: T;
}
interface ServiceError {
    status: ServiceStateEnum.ERROR;
    error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null; 
    result: IUrchin[];
}
