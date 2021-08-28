import React from 'react'

import {
    Toolbar,
    ToolbarButton,
    ToolbarSeparator,
    ToolbarButtonGroup,
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../../primitives/Toolbar'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { ReloadIcon } from '@radix-ui/react-icons'

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
            <ToolbarButtonGroup>
                <Refresh /> 
            </ToolbarButtonGroup>
        </Flex>
    )
}

export const Presets = () => {
    const [value, setValue] = useState('left')
    
    const handleChange = (e)

    return (
        <ToolbarToggleGroup 
            type="single" 
            value={value} 
            onValueChange={handleChange} 
            aria-label="Text alignment"
        >
           <ToolbarToggleItem value="left" aria-label="Left aligned">
             <Text> 1D </Text>
           </ToolbarToggleItem>

           <ToolbarToggleItem value="center" aria-label="Center aligned">
             <Text> 1W </Text>
           </ToolbarToggleItem>

           <ToolbarToggleItem value="right" aria-label="Right aligned">
             <Text> 1M </Text>
           </ToolbarToggleItem>
        </ToolbarToggleGroup>
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