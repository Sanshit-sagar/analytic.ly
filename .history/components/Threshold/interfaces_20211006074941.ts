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

    slugs
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
