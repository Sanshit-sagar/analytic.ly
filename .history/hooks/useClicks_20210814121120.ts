import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'

interface IClicksProps {
    clicks: any[] | null;
    loading: boolean;
    error: any | null; 
}

export const useClicks = (clicksEndpoint: string): IClicksProps => {
    const { data, error } = useSWR(clicksEndpoint, fetcher)

    return {
        clicks: data?.clicks || null,
        loading: !data && !error,
        error
    }; 
}
