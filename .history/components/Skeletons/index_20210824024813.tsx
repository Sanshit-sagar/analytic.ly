import React from 'react'
import { styled } from '../../stitches.config'

import Loading from '../Loading'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'


const StyledSkeletonContainer = styled('div', {
    bc: '$canvas', 
    br: '$1',
    padding: '$1',
    margin: '$1',
    fd: 'row',
    jc: 'center', 
    ai: 'center'
});


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
    </DashboardDisplayBox>
   )
}