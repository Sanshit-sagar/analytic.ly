import React from 'react'

import { Flex } from '../../../primitives/Flex'

import { DestinationUrlInput } from './Input'
import { FilteredDestinationUrls } from './Output'

const DestinationTabContainer = styled(Flex, {
    width: '300px',
    padding: '$1',
    bc: '$neutral',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    gap: '$1'
})

export const DestinationTabContent = () => (

        <DestinationTabContainer>
            <DestinationUrlInput />
            <FilteredDestinationUrls /> 
        </DestinationTabContainer>
    );