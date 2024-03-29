import React from 'react'

import { styled } from '../../../stitches.config'

import { Flex } from '../../../primitives/Flex'
import { SeoParamsInput } from './Input'

const SeoParametersContainer = styled(Flex, {
    fd:'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '225px',
});

export const SeoParametersTab = () => (
    <SeoParametersContainer>
        <SeoParamsInput /> 
    </SeoParametersContainer>
);