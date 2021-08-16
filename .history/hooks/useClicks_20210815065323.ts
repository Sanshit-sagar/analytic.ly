import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'
import { TimePeriod, TimeSeries } from '../lib/utils/timeseries'

interface Clickstream {
    clicks: any[] | null;
    loading: boolean;
    error: any | null; 
}

type XYTimeSeries = {
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

export const useTimeseries = (endpoint: string): XYTimeSeries => {
    const { data, error } = useSWR('/api/metrics/clickstream/recent/24/hours', fetcher);

    return {
        timeseries: data.timeseries || null,
        loading: !data && !error,
        error
    }
}

