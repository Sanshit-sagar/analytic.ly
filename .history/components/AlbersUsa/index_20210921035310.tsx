import React from 'react' 
import { source } from './data'
import type { GeoJSON } from './types'

import ParentSize  from '@visx/responsive/lib/components/ParentSizeModern'
import { HeatedAlbersUsa } from './HeatedAlbersUsa'
import { Text } from '../../primitives/Text'

import useSWR from 'swr'

interface GeoUsaResponse  { 
    data: GeoJSON | null; 
    loading: boolean; 
    error: any | null 
}

const geoUsaEndpoint = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/USA.json'
const useGeoUsa = ():GeoUsaResponse  => {
    const { data, error } = useSWR(geoUsaEndpoint)

    return {
        data: data || null,
        loading: !data && !error,
        error
    }
}

const AlbersUsa = () => {
   
    const { data, loading, error }: GeoUsaResponse = useGeoUsa();

    if(loading) return <Text> loading.... </Text>
    if(error || !data) return <Text> error! </Text> 

    let features = data.features;

    return (
        <ParentSize> 
            {({ height, width }) => (
                <HeatedAlbersUsa 
                    height={height} 
                    width={width}
                    map={features}
                    data={source}
                /> 
            )}
        </ParentSize>
    );
}

export default AlbersUsa