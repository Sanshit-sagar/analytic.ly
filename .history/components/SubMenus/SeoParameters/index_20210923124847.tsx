import React from 'react'

import { styled } from '../../stitches.config'

import { SeoParamsInput } from './input'
import { SeoParamsOutput } from './output'

const SeoParametersContainer = styled(Flex, {
    height: '600px',
    fd:'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '225px',
});

const SeoParameters = () => (
    <SeoParametersContainer>
        <SeoParamsInput /> 
        <SeoParamsOutput /> 
    </SeoParametersContainer>
);