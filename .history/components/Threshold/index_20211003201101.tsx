import React from 'react'
import useSWR from 'swr'


const useSlugClickstream = () => {
    const { data, error } = useSWR(`/api/metrics/slug/${slug}/tail//:range/:interval`)
}

const Threshold = () => {

    return (

    )
}

