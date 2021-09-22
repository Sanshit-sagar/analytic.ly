import { source } from './data'
import type { GeoJSON } from './types'
import useSWR from 'swr'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { HeatedAlbersUsa } from './HeatedAlbersUsa'

interface IHeatedAlbersUsaProps {
    height: number; 
    width: number;
}
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

export const AlbersUsaWrapper = ({ height, width }: IHeatedAlbersUsaProps) => {
   
    const { data, loading, error }: GeoUsaResponse = useGeoUsa();

    if(loading) return <Text> loading.... </Text>
    if(error || !data) return <Text> error! </Text> 

    let features = data.features;

    return (
        <Box css={{ bc: 'transparent', border: 'thin solid $border', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
                <HeatedAlbersUsa 
                    height={height} 
                    width={width}
                    features={features}
                    source={source}
                /> 
            </Flex>
        </Box>
    );
}