export enum UrchinCategoryEnum {
    MEDIUM = 'medium',
    SOURCE = 'source',
    TERM = 'term',
    CAMPAIGN = 'campaign',
    CONTENT = 'content'
}


export enum LoadingStatusEnum {
    LOADING = 'loading',
    LOADING_MORE = 'loadingMore',
    SORTING = 'sorting',
    FILTERING = 'filtering',
    IDLE = 'idle',
    ERROR = 'error'
}

export interface IUrchin {
    id: string; 
    category: UrchinCategoryType; 
    name: string; 
    frequency: number; 
    updatedAt: Date;
    createdAt: Date; 
}


export type UrchinCategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT

export interface IParamsAccordion {
    params: string[];
    name: string; 
    index: number;
}

export interface INumberFieldProps {
    label: string | string[] | undefined | null;
    value: number | string;
    handleUpdate: (value: number) => void;  
}

export interface IUrchinListProps { 
    key: Key;
    label: UrchinCategoryType; 
    filterValue: string; 
    setFilterValue: (v: string) => void; 
    endpoint: string | undefined; 
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


export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null; 
    result: IUrchin[];
};