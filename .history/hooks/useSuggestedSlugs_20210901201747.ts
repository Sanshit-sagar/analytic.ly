import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'

// import { suggestRandomUniqueSlug } from '../lib/utils/suggestions/random'
// 
// interface Suggestion {
    // slug: string; 
    // category: string;
// }

export const useSuggestedSlugs = ({ saltLength, numStrings }: { saltLength: number; numStrings: number }) => {
    if(window===undefined) return null; 

    const { 
        data, 
        error 
    } = useSWR(
        `/api/suggestions/random?saltLength=${saltLength}&numStrings=${numStrings}`,
        fetcher
    )

    return {
        suggestions: data || [],
        loading: !data && !error,
        error
    };
}