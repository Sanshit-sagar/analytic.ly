import React from 'react'
import useSWR from 'swr'

interface SlugClickstreamProps {
    slug: string;
    amount?: number;
    range?: string;
    interval?: string; 
}


const Threshold = () => {
    // TODO import timeseries atoms here
    const { data, loading, error } = useSlugClickstream({ slug })

    return (

    )
}

