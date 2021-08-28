import React, { useState } from 'react'

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

export const Presets = ({ preset, handleChange }: 
{ preset: { 
        value: string; 
        label: string; 
        title: string; 
        index: number; 
}; handleChange: (value: string) => void}) => {

    return (
        <ToolbarToggleGroup 
            type="single" 
            value={preset} 
            onValueChange={handleChange} 
            aria-label="Text alignment"
        >
            {presets.map((pst, idx) => {
                return (
                    <ToolbarToggleItem 
                        key={idx}
                        value={pst.value} 
                        aria-label={pst.label}
                    >
                        <Text size='1'> {pst.title} </Text>
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    );
}

const Controller = () => {
    const [preset, setPreset] = useState('left')
  
    const handleChange = (value: string) => {
        setPreset(value); 
    }

    return (
        <Toolbar>
            <TimeSelectionGroup />
            <ToolbarSeparator />
            <Presets />
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    );
}

export default Controller