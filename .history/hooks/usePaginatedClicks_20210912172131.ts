import React from 'react'
import useSWR from 'swr'

interface IUsePaginatedClicksProps {
    cursor: number;
    pageSize: number;
}

const usePaginatedClicks = ({ cursor, pageSize }: IUsePaginatedClicksProps) => {
    let endpoint = `/api/clicks/paginate/${email}/${cursor}/${pageSize}`

    const { data, error } = useSWR(endpoint);

    return {
        page: data?.clickstream ?? {},
        loading: !data && !error,
        error
    }; 
}