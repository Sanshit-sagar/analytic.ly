import { useState } from 'react'
import useSWR from 'swr' 

interface UseSavedSlugsProps {
    cursor: number; 
    pageSize: number;
}
interface SwrResponse {
    data: any;
    loading: boolean;
    error: Error | null; 
}


const useSavedSlugs = ({ cursor = 0, pageSize = 10 }: UseSavedSlugsProps): SwrResponse => {
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

    const updatePageSize = (newSize: number) => setPageSize(newSize)
    const updateCursor = (newCursor: string) => setCursor(newCursor)

    const { data, loading, error }: SwrResponse = useSavedSlugs({ cursor, pageSize })

    return (

    )
}