import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'

export const useSuggestedSlug = ({ saltLength, numStrings, saltType, separator, isManly }: { 
    saltLength: number; 
    numStrings: number; 
    saltType: 'number' | 'string' | 'mixed' | undefined;
    separator: string; 
    isManly: boolean 
}) => {

    const endpoint = `/api/suggestions/random`;
    
    const { 
        data, error 
    } = useSWR(`${endpoint}?saltLength=${saltLength}&numStrings=${numStrings}&saltType=${saltType}&separator=${separator}`, fetcher)

    return {
        suggestion: data?.suggestion || [],
        loading: !data && !error,
        error
    };
}