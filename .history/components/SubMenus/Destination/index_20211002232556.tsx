import React from 'react'

import { Flex } from '../../../primitives/Flex'

import { DestinationUrlInput } from './Input'
import { FilteredDestinationUrls } from './Output'

export const DestinationTabContent = () => {

    return (
        <DestinationTabContainer>
            <DestinationUrlInput />
            <FilteredDestinationUrls /> 
        </Flex>
    );
}