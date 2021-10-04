import React from 'react'
import useSWR from 'swr'

interface SlugClickstreamProps {
    slug: string;
    amount?: number;
    range?: string;
    interval?: string; 
}

const useSlugClickstream = ({ slug, amount = 1, range = 'month', interval = 'days' }: SlugClickstreamProps) => {

    const { data, error } = useSWR(`/api/metrics/slug/${slug}/tail/${amount}/${range}/${interval}`)

    return {
        data: data || {},
        loading: !data && !error,
        error
    };
}

const Threshold = () => {
    // TODO import timeseries atoms here
    const { data, loading, error } = useSlugClickstream({ slug })

    return (

    )
}

