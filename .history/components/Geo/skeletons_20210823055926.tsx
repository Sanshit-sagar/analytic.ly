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
                        <Flex css={{ fd: 'row', jc: 'center', ai: 'center'}}>
                            <Loading />;
                        </Flex>
                     );
                }}  
            </ParentSize>
        </VisxParentSizeWrapper>
    </DashboardDisplayBox>
   )
}

export default MercatorSkeleton