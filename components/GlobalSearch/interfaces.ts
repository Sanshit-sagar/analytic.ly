
export type UtmCategory = 'source' | 'medium' | 'term' | 'term' | 'campaign'

interface UtmParameters {
    source?: string;
    medium?: string;
    term?: string;
    campaign?: string;
    content?: string;
}

export interface Template {
    id: string;
    parameters: UtmParameters;
}

export interface UrlParameter {
    id: string;
    category: UtmCategory; 
    slugs: string[];
    templates: string[]; 
}

export enum UtmParametersEnum {
    SOURCE = 'source',
    MEDIUM = 'medium',
    TERM = 'term',
    CONTENT = 'content',
    CAMPAIGN = 'campaign'
}