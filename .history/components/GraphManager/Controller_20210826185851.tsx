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
import { ReloadIcon } from '@radix-ui'

import {
    TimeSelectionGroup,
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
            <ReloadIcon />
        </ToolbarButton>
    )
}

export const Actions = () => {

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
            {/* <ToolbarGroupLabel> Actions </ToolbarGroupLabel> */}
            <ToolbarButtonGroup>
                <Refresh /> 
            </ToolbarButtonGroup>
        </Flex>
    )
}

const Controller = () => {

    return (
        <Toolbar>
            <TimeSelectionGroup />
            <ToolbarSeparator />
            <ToggleGroup /> 
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    );
}

export default Controller