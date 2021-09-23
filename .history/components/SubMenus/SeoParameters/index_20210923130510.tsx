import React from 'react'

import { styled } from '../../stitches.config'

import { Flex } from '../../primitives/Flex'
import { SeoParamsInput } from './Input'
import { SeoParamsOutput } from './Output'

const SeoParametersContainer = styled(Flex, {
    height: '600px',
    fd:'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '225px',
});

export const SeoParameters = () => (
    <SeoParametersContainer>
        <SeoParamsInput /> 
        <SeoParamsOutput /> 
    </SeoParametersContainer>
);