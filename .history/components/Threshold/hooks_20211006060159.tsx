
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

    const { data, error }: ApiResponse<SlugsWithViews>  = useSWR(`api/users/sanshit.sagar@gmail.com/rankings/uniques`)

    return {
        data: data?.uniques || undefined,
        loading: !data && !error,
        error
    }

}