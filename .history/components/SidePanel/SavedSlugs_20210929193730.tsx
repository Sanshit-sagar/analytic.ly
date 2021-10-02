import React from 'react'
import useSWR from 'swr' 

const useSavedSlugs = () => {
    const { data, error } = useSWR(`/api/configs/list/`)
}

const SavedSlugs = () => {
    const { }

    return (

    )
}