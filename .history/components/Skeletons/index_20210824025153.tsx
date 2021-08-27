import React from 'react'
import { styled } from '../../stitches.config'

import Loading from '../Loading'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { VisxParentSizeWrapper } from '../../primitives/Shared'


export const GraphSkeleton:React.FC = () => {
   return (
        <VisxParentSizeWrapper>
             <ParentSize>
                {({ width, height }) => {
                     return (
                        <StyledSkeletonContainer css={{ height: height, width: width }}>
                            <Loading 
                                type='spinner' 
                                isIndeterminate={true}
                                value={100} 
                            />
                        </StyledSkeletonContainer>
                     );
                }}  
            </ParentSize>
        </VisxParentSizeWrapper>
   )
}