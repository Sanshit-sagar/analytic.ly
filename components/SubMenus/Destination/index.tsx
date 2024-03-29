import React from 'react'
import { styled } from '../../../stitches.config'

import { DestinationUrlInput } from './Input'
import { FilteredDestinationUrls } from './Output'

import { Flex } from '../../../primitives/Flex'

const DestinationTabContainer = styled(Flex, {
    width: '100%',
    bc: 'transparent',
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