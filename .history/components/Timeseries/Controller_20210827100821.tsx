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

import { useAtom, atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { TimeSelectionGroup } from './index'


let presets: { id: string; index: number; label: string; value: string }[] = [
    { id: '1d', index: 0, label: 'Past 1 Day', value: '/1/day' },
    { id: '2d', index: 1, label: 'Past 2 Days', value: '/2/day' },
    { id: '5d', index: 2, label: 'Past 5 Days', value: '/5/day' },
    { id: '1w', index: 3, label: 'Past 1 Week', value: '/1/week' },
    { id: '1m', index: 4, label: 'Past 1 Month', value: '/1/month' },
    { id: '3m', index: 5, label: 'Past 3 Months', value: '/3/month' },
    { id: '1y', index: 6, label: 'Past 1 Year', value: '/1/year' },
];    
const presetIndexAtom = atom(0)
const presetAtom = atom((get) => presets[get(presetIndexAtom)].id)

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
    const setPresetIndex = useUpdateAtom(presetIndexAtom)
    const [preset, _] = useAtom(presetAtom);

    const handleChange = (value: string) => {
        setPresetIndex(parseInt(value));
    }

    return (
        <ToolbarToggleGroup 
            type="single" 
            value={preset} 
            onValueChange={handleChange} 
            aria-label="Text alignment"
            disabled={false}
        >
            {presets.map((pst: typeof {...presets[0]}, idx: number) => {
                return (
                    <ToolbarToggleItem 
                        key={idx}
                        value={`${pst.index}`}
                        aria-label={pst.label}
                    >
                        <Text size='1'> {`${pst.id}`} </Text>
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    );
}

const Controller = () => {
    const [preset, setPreset] = useAtom(presetAtom)
  
    const handleChange = (value: string) => {
        setPreset(value); 
    }

    return (
        <Toolbar>
            <TimeSelectionGroup />
            <ToolbarSeparator />
            <Presets preset={preset} handleChange={handleChange} />
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    );
}

export default Controller