import useSWR from 'swr' 

interface SwrResponse {
    data: any;
    loading: boolean;
    error: Error | null; 
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export const useSavedSlugs = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/list`, fetcher)

    return {
        : data ? data.data : undefined,
        loading: !data && !error,
        error
    }
}