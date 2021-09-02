import dynamic from 'next/dynamic' 
import { Text } from '../../primitives/Text'
import Loading from '../Loading'

const DynamicOpenGraphPreview = dynamic(
    () => import('opengraph-react'),
    { ssr: false }
);

const OPENGRAPH_API_KEY = '40815603-3327-4223-b489-e98da949f5d4'

export const OpenGraphPreview = ({ destinationInput, isDestValid }) => {
    if(!isDestValid) return <Text> Waiting... </Text>

    let forceCacheUpdate = false; // let acceptLang, useProxy, onlyFetch 
    let previewSize = 'large'
    return (
        <Box css={{ padding: '$1', margin: '$1', marginLeft: 'auto', }}
        <DynamicOpenGraphPreview  
            site={`${destinationInput}`}
            appId={OPENGRAPH_API_KEY}
            size={previewSize}
            forceCacheUpdate={forceCacheUpdate}
            dontUseVideo
            loader={
                <Loading 
                    isIndeterminate 
                    type='spinner' 
                    value={100} 
                />
            }     
        />
    )
}