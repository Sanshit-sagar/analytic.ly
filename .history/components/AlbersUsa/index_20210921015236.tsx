import React from 'react' 
import ParentSize  from '@visx/responsive/lib/components/ParentSizeModern'
import { AlbersUsaWrapper } from './Wrapper


export const AlbersUsa = () => (

    <ParentSize> 
        {({ height, width }) => (
            <AlbersUsaWrapper 
                height={height} 
                width={width} 
            />
        )}
    </ParentSize>

);