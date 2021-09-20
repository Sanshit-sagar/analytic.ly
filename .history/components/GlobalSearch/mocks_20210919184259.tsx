
export type UtmCategory = 'source' | 'medium' | 'term' | 'content' | 'campaign'

export interface Urchin {
    id: string;
    category: UtmCategory; 
    slugs: string[];
}

export enum UtmParametersEnum {
    SOURCE = 'source',
    MEDIUM = 'medium',
    TERM = 'term',
    CONTENT = 'content',
    CAMPAIGN = 'campaign'
}

export const slugs = [
    { slug: 'slug1', destination: 'https://www.destination1.com', utms: ['source1', 'medium1', 'term3', 'campaign1', 'content1'] },
    { slug: 'slug2', destination: 'https://www.destination2.com', utms: ['source2', 'medium3', 'term2', '', ''] },
    { slug: 'slug3', destination: 'https://www.destination3.com', utms: ['source1', '', 'term1', 'campaign2', 'content2' ] },
    { slug: 'slug4', destination: 'https://www.destination4.com', utms: ['',  'medium1', 'term4', 'campaign1', 'content1'] },
    { slug: 'slug5', destination: 'https://www.destination5.com', utms: ['source1', 'medium2', 'term2', '', ''] },
    { slug: 'slug6', destination: 'https://www.destination6.com', utms: ['source2', 'medium2', 'term2', 'campaign2', 'content2'] },
];

export const sources: Urchin[] = [
    { id: 'source1', category: 'source', slugs: ['slug1', 'slug3', 'slug5'] },
    { id: 'source2', category: 'source', slugs: ['slug2', 'slug6'], updatedAt: new Date(2021, ) }
]
export const mediums: Urchin[] = [
    { id: 'medium1', category: 'medium', slugs: ['slug1', 'slug4'] },
    { id: 'medium2', category: 'medium', slugs: ['slug5', 'slug6'] },
    { id: 'medium3', category: 'medium', slugs: ['slug2'] },
]
export const terms: Urchin[] = [
    { id: 'term1', category: 'term', slugs: ['slug3'] },
    { id: 'term2', category: 'term', slugs: ['slug2', 'slug5', 'slug6'] },
    { id: 'term3', category: 'term', slugs: ['slug1'] },
    { id: 'term4', category: 'term', slugs: ['slug4'] },
]
export const campaigns: Urchin[] = [
    { id: 'campaign1', category: 'campaign', slugs: ['slug1', 'slug2'] },
    { id: 'campaign1', category: 'campaign', slugs: ['slug3', 'slug6'] },
]
export const contents: Urchin[] = [
    { id: 'content1', category: 'content', slugs: ['slug1', 'slug4'] },
    { id: 'content2', category: 'content', slugs: ['slug3', 'slug6'] }
]

const initSources = [ 
    'facebook', 
    'linkedin', 
    'twitter', 
    'youtube', 
    'google', 
    'pinterest', 
    'reddit', 
    'snapchat', 
    'hackernews', 
    'quora', 
    'wikipedia'
];