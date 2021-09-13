import { useState } from 'react'
import useSWR from 'swr'
// import { atom, useAtom } from 'jotai'

interface IUsePaginatedClicksProps {
    email: string; 
    cursor: number;
    pageSize: number;
    doFetch?: boolean;
}

const usePaginatedClicks = ({ email, cursor, pageSize }: IUsePaginatedClicksProps) => {
    let endpoint = `/api/clicks/paginate/${email}/${cursor}/${pageSize}`

    const { data, error } = useSWR(endpoint);

    return {
        page: data?.page ?? {},
        loading: !data && !error,
        error
    }; 
}













