import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'
import { SaltType } from '../lib/utils/suggestions/random'
// import { suggestRandomUniqueSlug } from '../lib/utils/suggestions/random'
// 
// interface Suggestion {
    // slug: string; 
    // category: string;
// }

export const useSuggestedSlugs = ({ saltLength, numStrings, saltType, separator, isManly }: { 
    saltLength: number; 
    numStrings: number; 
    saltType: 'number' | 'string' | 'mixed' | undefined;
    separator: string; 
    isManly: boolean 
}) => {
    if(window===undefined) return null; 

    const endpoint = `/api/suggestions/random?`
    const { 
        data, 
        error 
    } = useSWR(
        `${endpoint}?saltLength=${saltLength}&numStrings=${numStrings}&saltType=${saltType}&separator=${separator}&isManly=${isManly.toString()}`,
        fetcher
    )

    return {
        suggestions: data || [],
        loading: !data && !error,
        error
    };
}