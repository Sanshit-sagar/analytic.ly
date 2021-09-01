import dynamic from 'next/dynamic' 
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import Loading from '../Loading'

const DynamicOpenGraphPreview = dynamic(
    () => import('opengraph-react'),
    { ssr: false }
);

const OPENGRAPH_API_KEY = '40815603-3327-4223-b489-e98da949f5d4'

export const OpenGraphPreview = ({ destinationInput, isDestValid }) => {
    if(!isDestValid) return <Text> Waiting... </Text>

    let forceCacheUpdate = false // let acceptLang, useProxy, onlyFetch 
    let previewSize = 'large'

    return (
        <Box css={{ 
            padding: '$2', 
            margin: '$1',  
            border: 'thin solid', 
            borderColor: '$hiContrast', 
            br: '$2',
            backgroundColor: '$panel', 
            height: '400px', 
        }}> 
            <DynamicOpenGraphPreview  
                site={`${destinationInput}`}
                appId={OPENGRAPH_API_KEY}
                size={previewSize}
                forceCacheUpdate={forceCacheUpdate}
                dontUseVideo
                onlyFetch
                loader={
                    <Loading 
                        isIndeterminate 
                        type='spinner' 
                        value={100} 
                    />
                }     
            >   
                 {({ results }) => {
                     return (
                         <Text size='1'> 
                         {JSON.stringify(results)} 
                         </Text> 
                     )
                 }}
            </DynamicOpenGraphPreview>
        </Box>
    )
}