import React from 'react'

import Loading from '../Loading'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

interface SkeletonProps {
   height: number;
   width: number;
}

const MercatorSkeleton:React.FC = () => {
   return (
    <DashboardDisplayBox>
        <VisxParentSizeWrapper>
             <ParentSize>
                {({ width, height }) => {
                     return (
                        <Box css={{  height: height} width={width}>
                             <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'center', ai: 'center'}}>
                                 <Loading />;
                             </Flex>
                        </Box>
                     );
                }}  
            </ParentSize>
        </VisxParentSizeWrapper>
    </DashboardDisplayBox>
   )
}

export default MercatorSkeleton