import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'
import * as namor from 'namor'

interface Suggestion {
    slug: string; 
    category: string;
}

export const useSlugSuggestions = () => {

    let suggestedSlugs: Suggestion = [];
    
    
}