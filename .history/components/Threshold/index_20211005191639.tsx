import React from 'react'
import useSWR from 'swr'
import { Text } from '../../primitives/Text'

interface SlugClickstreamProps {
    slug: string;
    amount?: number;
    range?: string;
    interval?: string; 
}

interface ParentSizeProps {
    height: number;
    width: number; 
}


const Threshold = () => {
    // TODO import timeseries atoms here
    // http://localhost:3000/api/users/sanshit.sagar@gmail.com/rankings/frequencies

    return (
        <VisxParentSizeWrapper>
            <ParentSize>
                {({ height, width }: ParentSizeProps) => (

                )}
            </ParentSize>

       </VisxParentSizeWrapper>
    )
}
