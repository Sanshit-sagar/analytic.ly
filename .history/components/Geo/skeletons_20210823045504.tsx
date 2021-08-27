import React from 'react'
import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'



interface SkeletonProps {
   height: number;
   width: number;
}

const MercatorSkeleton:React.FC = () => {
   return (
       <DashboardDisplayBox>
           <VisxParentSizeWrapper>
               <ParentSize>
                   {({ width, height }) 
                           return (
                               <Flex css={{ fd: 'row', jc: 'center', ai: 'center'}}>
                                   <Loading />;
                               </Flex>
                           );
                       }      
               </ParentSize>
           </VisxParentSizeWrapper>
       </DashboardDisplayBox>
   )
}

export default MercatorSkeleton