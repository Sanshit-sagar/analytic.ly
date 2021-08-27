import React from 'react'

import Loading from '../Loading'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { 
    SkeletonContainer,
    VisxParentSizeWrapper 
} from '../../primitives/Shared'


export const GraphSkeleton:React.FC = () => {
   return (
        <VisxParentSizeWrapper>
             <ParentSize>
                {({ width, height }) => {
                     return (
                        <SkeletonContainer css={{ height: height, width: width }}>
                            <Loading 
                                type='spinner' 
                                isIndeterminate={true}
                                value={100} 
                            />
                        </SkeletonContainer>
                     );
                }}  
            </ParentSize>
        </VisxParentSizeWrapper>
   )
}