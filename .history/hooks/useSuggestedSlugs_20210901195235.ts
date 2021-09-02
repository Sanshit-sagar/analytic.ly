import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'

import { suggestRandomUniqueSlug } from '../lib/utils/suggestions'

interface Suggestion {
    slug: string; 
    category: string;
}

export const useSlugSuggestions = ({ saltLength, numStrings }: { saltLength: number; numStrings: number } ) => {

    let suggestedSlugs = suggestRandomUniqueSlug(saltLength, numStrings, 'mixed', '-', false);

    
}