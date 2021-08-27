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
         <Pattern id='' width={width} height={height} />
             <animateTransform
                 attributeType="xml"
                 attributeName="patternTransform"
                 type="translate"
                 from="0 0"
                 to="50 0"
                 dur="10s"
                 repeatCount="indefinite"
             />
             <path
               d={`M 0 ${height / 2} c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${-height /
                 4} , ${height / 2} 0
                    c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${height /
                 2} 0 M ${-height / 2} ${height / 2}
                    c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${height /
                 2} 0 M ${height} ${height / 2}
                    c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${-height / 4} , ${height /
                 2} 0`}
               fill="none"
               stroke="black"
               strokeWidth={1}
             />
         </Pattern>
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