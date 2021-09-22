import React from 'react' 
import ParentSize  from '@visx/responsive/lib/components/ParentSizeModern'
import { HeatedAlbersUsa } from './HeatedAlbersUsa'


export const AlbersUsa = () => (

    <ParentSize> 
        {({ height, width }) => (
            <HeatedAlbersUsa 
                height={height} 
                width={width} 
            />
        )}
    </ParentSize>

);