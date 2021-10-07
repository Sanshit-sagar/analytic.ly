import useSWR from 'swr'

export type Ranking =  {
    slug: string; 
    uniques: number;
    normal: number;
    rank: number;  
}

export interface SlugsWithViews {
    uniques: { 
        [slug: string]: { 
            rankings: Ranking[]; 
            max: number;
        },
    }; 
}

export type ApiResponse<T>  = {
    data?: T; 
    error?: Error | any | null; 
}

export const useSlugsWithViews = () => {
    let endpoint = '/api/users/sanshit.sagar@gmail.com/rankings/uniques'

    const { data, error }: ApiResponse<SlugsWithViews>  = useSWR(endpoint)

    if(data && !error) {
        console.log(data)
    }

    return {
        data: data?.uniques || undefined,
        loading: !data && !error,
        error
    }

}