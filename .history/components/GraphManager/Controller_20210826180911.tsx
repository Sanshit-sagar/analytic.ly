import React from 'react'

import {
    Toolbar,
    ToolbarButton,
    ToolbarSeparator,
    ToolbarButtonGroup,
    ToolbarGroupLabel
} from '../../primitives/Toolbar'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import {
    Quantity,
    TimeAgo,
    TickSize,
    ToggleGroup
} from './index'

const Refresh = () => {
    const handleAction = () => alert('Submitting...')

    return (
        <ToolbarButton
            as='button'
            css={{ marginLeft: 'auto' }}
            onClick={handleAction}
        >
            Refresh
        </ToolbarButton>
    )
}

export const Actions = () => {

    return (
        <Flex css={{ backgroundColor: 'white', fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            <Text size='1' variant='green'> Actions </Text>
            <ToolbarButtonGroup>
                <Refresh /> 
            </ToolbarButtonGroup>
        </Flex>
    )
}

const Controller = () => {

    return (
        <Toolbar>
            <Quantity />
            <TimeAgo /> 
            <TickSize />
            <ToolbarSeparator />
            <ToggleGroup /> 
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    );
}

export default Controller