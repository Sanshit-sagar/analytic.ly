import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'

// import { suggestRandomUniqueSlug } from '../lib/utils/suggestions/random'

interface Suggestion {
    slug: string; 
    category: string;
}

export const useSlugSuggestions = ({ saltLength, numStrings }: { saltLength: number; numStrings: number } ) => {

    const { data, error } = useSWR([ `/api/suggestions/random`, fetcher)

    
}