import { useState } from 'react'
import useSWR from 'swr'
// import { atom, useAtom } from 'jotai'

interface IUsePaginatedClicksProps {
    email: string; 
    cursor: number;
    pageSize: number;
    doFetch: boolean;
}

const usePaginatedClickstream = ({ email, cursor, pageSize, doFetch }: IUsePaginatedClicksProps) => {
    let endpoint = `/api/clicks/paginate/${email}/${cursor}/${pageSize}`

    const { data, error } = useSWR(doFetch ? endpoint : null);

    return {
        page: data?.clickstream ?? {},
        loading: !data && !error,
        error
    }; 
}

export const usePaginatedClicks = () => {
    const email = 'sanshit.sagar@gmail.com'
    
    const [cursor, setCursor] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const handleNextPage = (updatedCursor?: number) => {
        if(updatedCursor) {
            setPageSize(updatedCursor - cursor)
            setCursor(updatedCursor)
        } else {
            setCursor(cursor + pageSize); 
        }
    }

    return usePaginatedClickstream({ email, cursor, pageSize })
}