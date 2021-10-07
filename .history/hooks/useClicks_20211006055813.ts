import useSWR from 'swr'

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
    const { data, error } = useSWR(clicksEndpoint)

    return {
        clicks: data?.clicks || null,
        loading: !data && !error,
        error
    }; 
}

export const useTimeseries = (endpoint: string): XYTimeSeries => {
    const { data, error } = useSWR(endpoint);

    return {
        timeseries: data?.timeseries || null,
        loading: !data && !error,
        error
    }
}

export const useUniques = () => {
    let endpoint = `/api/users/sanshit.sagar@gmail.com/uniques`

    const { data, error } = useSWR(endpoint);

    return {
        uniques: data?.userUniques || [],
        firsts: data?.firsts || [],
        loading: !data && !error,
        error
    }
}

export const useClickHistoryForUser = (amount: number, range: string, interval: string) => {
    let endpoint = `/api/metrics/user/sanshit.sagar@gmail.com/tail/${amount}/${range}/${interval}`

    const { data, error } = useSWR(endpoint);

    return {
        clicks: data?.mergedIntervals || {},
        details: data?.viewsByIntervals || null,
        bounds: data?.bounds || [],
        range: data?.range || '',
        interval: data?.interval || '',
        numPeriods: data?.numPeriods || 0,
        numClicks: data?.numClicks || 0, 
        loading: !data && !error,
        minTimestamp: data?.minTimestamp, 
        maxTimestamp: data?.maxTimestamp,
        error,
        endpoint
    }
}


export const useClickHistoryForSlug = (slug:string, amount: string, range: string, interval: string) => {

    const API = '/api/metrics/slug'
    let endpoint =  `${API}/${slug}/tail/${amount}/${range}/${interval}`

    const { data, error } = useSWR(range && slug && interval ? `${API}/${slug}/tail/${amount}/${range}/${interval}` : null)

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

export const useFrequencies = () => {
    let endpoint =  `/api/users/sanshit.sagar@gmail.com/frequencies`

    const { data, error } = useSWR(endpoint)

    return {
        freqs: data?.frequencies || {},
        loading: !data && !error,
        error,
    };
}

export interface RankedDatum {
    title: string; 
    score:number; 
    rank: number; 
    normalizedFreq: number; 
}

export const useUserRankings = (category: string, email?: string, topOnly: boolean = false) => {
    let rankingCategory = category==='freqs' ? 'frequencies' : 'uniques'
    let endpoint = `/api/users/sanshit.sagar@gmail.com/rankings/${rankingCategory}`

    const { data, error } = useSWR(endpoint);


    return category==='freqs' ? {
            views: data || null, 
            vloading: !data && !error , 
            vError: error 
         } : { 
            uniques: data?.uniques || null,
            uloading: !data && !error , 
            uError: error 
        }
}

export const useGeodata = (fetchStats: boolean = false, mode?: string) => {
    let endpoint = `/api/geo/clicks/user/sanshit.sagar@gmail.com`
    if(fetchStats) endpoint += `/stats/${mode}`;

    const { data, error } = useSWR(endpoint)

    return {
        geodata: data?.geodata || null,
        loading: !data && !error,
        error
    };
}

export const useUserStatistics = () => {
    let statisticsEndpoint = `/api/users/sanshit.sagar@gmail.com/statistics`
    const { data, error } = useSWR(statisticsEndpoint)

    return {
        statistics: data?.userStatistics || null,
        statsLoading: !data && !error,
        statsError: error
    }
}

export const useUserSummary = () => {
    let summaryEndpoint = `/api/users/sanshit.sagar@gmail.com/summary`
    const { data, error } = useSWR(summaryEndpoint)

    return {
        summary: data?.userSummary || null,
        smLoading: !data && !error,
        smError: error
    }
}

type Ranking =  {
    slug: string; 
    uniques: number;
    normal: number;
    rank: number;  
}

interface SlugsWithViews {
    uniques: { 
        [slug: string]: { 
            rankings: Ranking[]; 
            max: number;
        },
    }; 
}

type ApiResponse {
    
}

export const useSlugsWithViews = () => {

    const { data, error }: SlugsWithViewsApiResponse  = useSWR(`api/users/sanshit.sagar@gmail.com/rankings/uniques`)

    return {
        data: data?.data || undefined,
        loading: !data && !error,
        error
    }

}