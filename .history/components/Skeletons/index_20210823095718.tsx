import React from 'react'
import { styled } from '../../stitches.config'

import Loading from '../Loading'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

const StyledSkeletonContainer = styled('div', {
    bc: '$canvas', 
    br: '$1',
    padding: '$1',
    margin: '$1',
    fd: 'row',
    jc: 'center', 
    ai: 'center'
});


const GraphSkeleton:React.FC = () => {
   return (
    <DashboardDisplayBox>
        <VisxParentSizeWrapper>
             <ParentSize>
                {({ width, height }) => {
                     return (
                        <StyledSkeletonContainer>
                            <Loading 
                              type='spinner' 
                              isIndeterminate 
                              value={100} 
                            />
                        </StyledSkeletonContainer>
                     );
                }  
            </ParentSize>
        </VisxParentSizeWrapper>
    </DashboardDisplayBox>
   )
}

export default GraphSkeleton