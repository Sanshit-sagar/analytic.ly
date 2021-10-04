import React from 'react'

import { Flex } from '../../../primitives/Flex'

import { DestinationUrlInput } from './Input'
import { FilteredDestinationUrls } from './Output'

const DestinationTabContainer = styled(Flex, {
    fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'
})

export const DestinationTabContent = () => {

    return (
        <DestinationTabContainer>
            <DestinationUrlInput />
            <FilteredDestinationUrls /> 
        </Flex>
    );
}