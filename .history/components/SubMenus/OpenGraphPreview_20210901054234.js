import dynamic from 'next/dynamic' 
import { useRouter } from 'next/router'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { ScrollView } from '../Table/ScrollView'
import Loading from '../Loading'

const DynamicOpenGraphPreview = dynamic(
    () => import('opengraph-react'),
    { ssr: false }
);

const OPENGRAPH_API_KEY = '40815603-3327-4223-b489-e98da949f5d4'

let FORCE_CACHE_UPDATE = false // let acceptLang, useProxy, onlyFetch 
const PREVIEW_SIZE = 'large'|| 'medium'
const ACCEPT_LANG = 'en'
const USE_PROXY = true
const ONLY_FETCH = false

export const OpenGraphPreview = ({ destinationInput, isDestValid }) => {
    const router = useRouter();
    if(!isDestValid) return <Text> Waiting... </Text>


    const handleClick = () => alert(`Re-routing to: ${destinationInput}`)

    return (
        <Box 
            as='button'
            css={{ 
                padding: '$1', 
                margin: '$1',  
                border: 'thin solid', 
                borderColor: '$hiContrast', 
                br: '$2',
                backgroundColor: 'transparent', 
                height: '400px'
            }}
        > 
           <ScrollView>
                <DynamicOpenGraphPreview  
                    site={`${destinationInput}`}
                    appId={OPENGRAPH_API_KEY}
                    size={PREVIEW_SIZE}
                    forceCacheUpdate={FORCE_CACHE_UPDATE}
                    dontUseVideo
                    loader={
                        <Loading 
                            isIndeterminate 
                            type='spinner' 
                            value={100} 
                        />
                    }     
                />
            </ScrollView>
        </Box>
    )
}