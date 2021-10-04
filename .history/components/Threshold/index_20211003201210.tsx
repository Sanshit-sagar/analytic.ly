import React from 'react'
import useSWR from 'swr'

interface SlugClickstreamProps {
    slug: string;
    amount?: number;
    range: string;
    interval: string; 
}

const useSlugClickstream = ({ slug, amount, range, interval }; SlugClickstreamProps) => {
    const { data, error } = useSWR(`/api/metrics/slug/${slug}/tail/${amount}/${range}/${interval}`)
}

const Threshold = () => {

    return (

    )
}

