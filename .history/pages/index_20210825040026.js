import React from 'react';

import { Box } from '../primitives/Box'
import {StyledAppContainer} from '../primitives/Shared'
import GraphManager from '../components/GraphManager' 

import { DashboardDisplayBox, VisxParentSizeWrapper } from '../primitives/Shared';
import ParentSize from '@visx/responsive/lib/components/ParentSize'

const Home = () => {

  return (
        <StyledAppContainer>
            <GraphManager />
        </StyledAppContainer>
    );
}

export default Home;