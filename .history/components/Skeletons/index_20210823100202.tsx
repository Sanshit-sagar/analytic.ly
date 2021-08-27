import React from 'react'
import { styled } from '../../stitches.config'

import Loading from '../Loading'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'
import { Pattern } from '@visx/pattern'


const StyledSkeletonContainer = styled('div', {
    bc: '$canvas', 
    br: '$1',
    padding: '$1',
    margin: '$1',
    fd: 'row',
    jc: 'center', 
    ai: 'center'
});

const CustomPattern:React.FC<> = () => {
    const height=10;
    const width=10;

    return (
        eight={height} />
        
        
        ansform"
        
        
        
        
        
        
        
        height / 8} ${-height / 4} , ${(height * 3) / 8} ${-height /
        
        ght / 4} , ${(height * 3) / 8} ${height / 4} , ${height /
        height / 2}
        ght / 4} , ${(height * 3) / 8} ${height / 4} , ${height /
        t / 2}
        ight / 4} , ${(height * 3) / 8} ${-height / 4} , ${height /
        
        
        
        
        
        
    )
}


const GraphSkeleton:React.FC = () => {
   return (
    <DashboardDisplayBox>
        <VisxParentSizeWrapper>
             <ParentSize>
                {({ width, height }) => {
                     return (
                        <StyledSkeletonContainer css={{ height: height, width: width }}>
                            <Loading type='spinner' isIndeterminate value={100} />
                        </StyledSkeletonContainer>
                     );
                }}  
            </ParentSize>
        </VisxParentSizeWrapper>
    </DashboardDisplayBox>
   )
}

export default GraphSkeleton