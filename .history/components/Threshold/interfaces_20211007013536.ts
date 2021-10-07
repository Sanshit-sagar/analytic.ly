export interface Click {
    date: Date;
    groupA: number;
    groupB: number; 
}

export interface Margin { 
    top: number; 
    bottom: number; 
    left: number; 
    right: number;
}

export interface AreaDifferenceProps {
    // clicks: Click[];
    slugs: string[];
    height: number;
    width: number;
    margin?: Margin;
}

export interface ParentSizeProps {
    height: number;
    width: number; 
}

export interface SlugClickstreamProps {
    slug: string;
    amount?: number;
    range?: string;
    interval?: string; 
}


export interface StoredSlugState {
    slug: string; 
    selectedValue: string | undefined; 
    isSelected: boolean; 
    isLoading: boolean; 
    endpoint: string;
}

export interface IItem {
    id: string;
    value: string;
    textValue: string;
    icon: React.ReactNode | undefined;
    alt: string | undefined; 
}

export interface Vi