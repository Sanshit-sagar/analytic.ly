import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'
import { TimePeriod, TimeSeries } from '../lib/utils/timeseries'

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

export const useAllClicksForUser = () => {
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
