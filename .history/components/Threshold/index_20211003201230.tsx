import React from 'react'
import useSWR from 'swr'

interface SlugClickstreamProps {
    slug: string;
    amount?: number;
    range?: string;
    interval?: string; 
}

const useSlugClickstream = ({ slug, amount = 1, range = 'month', interval = 'hour' }; SlugClickstreamProps) => {
    const { data, error } = useSWR(`/api/metrics/slug/${slug}/tail/${amount}/${range}/${interval}`)
}

const Threshold = () => {

    return (

    )
}

