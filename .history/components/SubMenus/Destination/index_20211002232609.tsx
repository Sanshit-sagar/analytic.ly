import React from 'react'

import { Flex } from '../../../primitives/Flex'

import { DestinationUrlInput } from './Input'
import { FilteredDestinationUrls } from './Output'

const DestinationTabContainer = styled()

export const DestinationTabContent = () => {

    return (
        <DestinationTabContainer>
            <DestinationUrlInput />
            <FilteredDestinationUrls /> 
        </Flex>
    );
}