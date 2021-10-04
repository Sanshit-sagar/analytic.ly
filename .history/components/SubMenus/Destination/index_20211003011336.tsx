import React from 'react'
import { styled } from '../../../stitches.config'

import { DestinationUrlInput } from './Input'
import { FilteredDestinationUrls } from './Output'

import { Flex } from '../../../primitives/Flex'

const DestinationTabContainer = styled(Flex, {
    bc: 'transparent',
    width: '100%',
    padding: '$1',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1',
})

export const DestinationTabContent = () => (
    <DestinationTabContainer>
        <DestinationUrlInput />
        <FilteredDestinationUrls /> 
    </DestinationTabContainer>
);