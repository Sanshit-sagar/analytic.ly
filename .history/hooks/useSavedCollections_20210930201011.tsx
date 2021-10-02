import useSWR from 'swr' 

interface SwrResponse {
    data: string[];
    loading: boolean;
    error: Error | null; 
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export const useSavedSlugs = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/slugs/verbose`, fetcher)

    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    }
}
export const useSavedDestinations = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/destinations/verbose`, fetcher)

    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    } 
}

export const useSlugDetails = (slug: string): SwrResponse => {
    console.log('IM HERE')
    const { data , error } = useSWR(`http://localhost:3000/api/config/slug/ossified-profession-432`, fetcher)
    
    if(data) {
        console.log('GOT IT!')
        console.log(data.data)
    }

    return {
        data: data,
        loading: !data && !error,
        error
    } 
}