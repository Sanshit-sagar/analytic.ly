
import { useIsSSR } from '@react-aria/ssr'
import { Text } from '../../primitives/Text'
import Loading from '../Loading'
import OpengraphReactComponent from 'opengraph-react'
// 
// interface IOpenGraphPreviewProps {
    // destinationInput: string; 
    // isDestValid: boolean; 
// }
// { destinationInput, isDestValid }: IOpenGraphPreviewProps
// 

const OPENGRAPH_API_KEY = '40815603-3327-4223-b489-e98da949f5d4'

export const OpenGraphPreview = () => {
    let isSSR = useIsSSR()

    if(!isSSR) return null
    if(!isDestValid) return <Text> Waiting... </Text>

    let forceCacheUpdate = false; // let acceptLang, useProxy, onlyFetch 

    return (
        <OpengraphReactComponent  
            site={`${destinationInput}`}  
            appId={OPENGRAPH_API_KEY}  
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