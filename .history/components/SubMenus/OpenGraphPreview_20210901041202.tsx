
import { useIsSSR } from '@react-aria/ssr'
import OpengraphReactComponent from 'opengraph-react'

import Loading from '../../components/Loading'
const OPENGRAPH_API_KEY = '40815603-3327-4223-b489-e98da949f5d4'

export const OpenGraphPreview = ({ destinationInput, isDestValid }: IOpenGraphPreviewProps) => {
    let isSSR = useIsSSR()

    if()
    if(!isDestValid) return <Text> Waiting... </Text>

    let forceCacheUpdate = false;
    // let acceptLang, useProxy, onlyFetch 

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
            size={'large'}    
        />
    )
}