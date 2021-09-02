import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'
import * as namor from 'namor'


export const useSlugSuggestions = () => {

    let suggestedSlugs: { slug: string; category: string; } = [];
    
}