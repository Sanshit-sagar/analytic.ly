import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'

export interface Clickstream {
    clicks: any[] | null;
    loading: boolean;
    error: any | null; 
}

export type XYTimeSeries = {
    timeseries: any[] | null,
    loading: boolean;
    error: any | null; 
}

export const useClicks = (clicksEndpoint: string): Clickstream => {
    const { data, error } = useSWR(clicksEndpoint, fetcher)

    return {
        clicks: data?.clicks || null,
        loading: !data && !error,
        error
    }; 
}

export const useTimeseries = (endpoint: string): XYTimeSeries => {
    const { data, error } = useSWR(endpoint, fetcher);

    return {
        timeseries: data?.timeseries || null,
        loading: !data && !error,
        error
    }
}

export const useUniques = () => {
    let endpoint = `/api/users/sanshit.sagar@gmail.com/uniques`

    const { data, error } = useSWR(endpoint, fetcher);

    return {
        uniques: data?.userUniques || {},
        loading: !data && !error,
        error
    }
}

export const useClickHistoryForUser = () => {
    let endpoint = `/api/metrics/user/sanshit.sagar@gmail.com/tail/3/day/hour`

    const { data, error } = useSWR(endpoint, fetcher);

    return {
        clicks: data?.mergedIntervals || {},
        details: data?.viewsByIntervals || null,
        bounds: data?.bounds || [],
        range: data?.range || '',
        interval: data?.interval || '',
        numPeriods: data?.numPeriods || 0,
        numClicks: data?.numClicks || 0, 
        loading: !data && !error,
        error
    }
}


export const useClickHistoryForSlug = (slug:string, amount: string, range: string, interval: string) => {

    const API = '/api/metrics/slug'
    let endpoint =  `${API}/${slug}/tail/${amount}/${range}/${interval}`

    const { data, error } = useSWR(range && slug && interval ? `${API}/${slug}/tail/${amount}/${range}/${interval}` : null, fetcher);

    return {
        data: data || {},
        loading: !data && !error,
        error,
        endpoint,
        slug: data?.slug || 'N/A',
        range: data?.slug || '-',
        interval: data?.slug || '-',
        size: data?.size || 0,
    }
}

export const useFrequencies = (filter: string = 'ip') => {
    let endpoint =  `/api/users/sanshit.sagar@gmail.com/frequencies/${filter}`;

    const { data, error } = useSWR(endpoint, fetcher);

    return {
        freqs: data?.freqs || {},
        loading: !data && !error,
        error,
    };
}
