
import {useIsSSR} from '@react-aria/ssr';
import OpengraphReactComponent from 'opengraph-react'


import Loading from '../../components/Loading'

export const OpenGraphPreview = ({ destinationInput, isDestValid }: IOpenGraphPreviewProps) => {
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