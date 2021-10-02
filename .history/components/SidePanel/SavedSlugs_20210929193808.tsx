import React from 'react'
import useSWR from 'swr' 

const useSavedSlugs = () => {
    const { data, error } = useSWR(`/api/configs/list/${cursor}/${pageSize}`)

    return (
        
    )
}

const SavedSlugs = () => {
    const { }

    return (

    )
}