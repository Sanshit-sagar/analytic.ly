import React, { useState } from 'react'
import useSWR from 'swr' 

interface UseSavedSlugsProps {
    cursor: number; 
    pageSize: number;
}


const useSavedSlugs = ({ cursor = 0, pageSize = 10 }: UseSavedSlugsProps) => {
    const { data, error } = useSWR(`/api/configs/list/${cursor}/${pageSize}`)

    return {
        data: data || undefined,
        loading: !data && !error,
        error
    }
}

const SavedSlugs = () => {
    const [pageSize, setPageSize] = useState(10)
    const [cursor, setCursor] = useState(0)
    const { data, loading, error } = useSavedSlugs({ cursor, pageSize })

    return (

    )
}