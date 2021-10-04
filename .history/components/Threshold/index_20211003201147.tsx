import React from 'react'
import useSWR from 'swr'


const useSlugClickstream = ({ slug, amount, range, interval }; SlugClickstreamProps) => {
    const { data, error } = useSWR(`/api/metrics/slug/${slug}/tail/${amount}/${range}/${interval}`)
}

const Threshold = () => {

    return (

    )
}
