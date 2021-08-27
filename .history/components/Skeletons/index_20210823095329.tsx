import React from 'react'
import { styled } from '../../stitches.config'

import Loading from '../Loading'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

const Sty


const GraphSkeleton:React.FC = () => {
   return (
    <DashboardDisplayBox>
        <VisxParentSizeWrapper>
             <ParentSize>
                {({ width, height }) => {
                     return (
                        <Box css={{  height: height, width: width, bc: '$canvas', br: '$1' }}>
                             <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'center', ai: 'center'}}>
                                 <Loading 
                                    type='spinner' 
                                    isIndeterminate 
                                    value={100} 
                                />
                             </Flex>
                        </Box>
                     );
                }}  
            </ParentSize>
        </VisxParentSizeWrapper>
    </DashboardDisplayBox>
   )
}

export default GraphSkeleton