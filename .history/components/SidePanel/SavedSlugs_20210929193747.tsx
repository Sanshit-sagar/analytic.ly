import React from 'react'
import useSWR from 'swr' 

const useSavedSlugs = () => {
    const { data, error } = useSWR(`/api/configs/list/${cursor}/${pageSize}`)
}

const SavedSlugs = () => {
    const { }

    return (

    )
}