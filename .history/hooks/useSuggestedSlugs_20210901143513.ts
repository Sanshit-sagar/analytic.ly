import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'
import * as namor from 'namor'

interface Suggestion {
    slug: string; 
    category: string;
}

function SuggestRandomSlug(saltLen?: number, numStrings?: number, manly: boolean = false) {

    if(!saltLen && !numString) return namor.generate();

}


export const useSlugSuggestions = () => {

    let suggestedSlugs: Suggestion = [];

    
}