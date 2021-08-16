import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'
import { TimePeriod, TimeSeries } from '../lib/utils/timeseries'

interface Clickstream {
    clicks: any[] | null;
    loading: boolean;
    error: any | null; 
}

type XYTimeseries = {
    timeseries: TimeSeries | null,
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

export const useAggregatedClicks = (endpoint: string): XYTimeseries => {
    const { data, error } = useSWR(endpoint, fetcher);

    return {
        timeseries: data || null,
        loading: !data && !error,
        error
    }
}

