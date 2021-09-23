import useSWR from 'swr'

let postUrchinsEndpoint = '/api/urchins/user/sanshit.sagar@gmail.com'

export const useUserUrchins = () => {
    const { data, error } = useSWR(postUrchinsEndpoint)

    return {
        data,
        loading: !data && !error,
        error 
    }
}


export const useMutableUserUrchins = () => {
    const { data, mutate } = useSWR(postUrchinsEndpoint)

    return {
        data,
        mutate
    }
}