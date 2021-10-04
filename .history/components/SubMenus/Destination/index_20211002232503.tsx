import React from 'react'
import { Flex } from '../../../primitives/Flex'

const DestinationTabContent = () => {

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            <DestinationUrlInput />
            <FilteredDestinationUrls /> 
        </Flex>
    );
}