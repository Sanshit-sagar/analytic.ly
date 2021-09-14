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

import { useAtom, atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { TimeSelectionGroup } from './index'

export interface IPreset {
    id: string; 
    index: number; 
    label: string; 
    value: string 
};

let presets: IPreset[] = [
    { id: '1d', index: 0, label: 'Past 1 Day', value: '1/day/hour' },
    { id: '2d', index: 1, label: 'Past 2 Days', value: '2/day/hour' },
    { id: '5d', index: 2, label: 'Past 5 Days', value: '5/day/day' },
    { id: '1w', index: 3, label: 'Past 1 Week', value: '1/week/day' },
    { id: '1m', index: 4, label: 'Past 1 Month', value: '1/month/week' },
    { id: '3m', index: 5, label: 'Past 3 Months', value: '3/month/week' },
    { id: '1y', index: 6, label: 'Past 1 Year', value: '1/year/month' },
];    

const API_ENDPOINT_BASE = 'http://localhost:3000/api/metrics/user/sanshit.sagar@gmail.com'
export const presetIndexAtom = atom(0)
export const presetAtom = atom((get) => presets[get(presetIndexAtom)].id)
export const presetSuffixAtom = atom((get) => presets[get(presetIndexAtom)].value)
export const presetEndpointAtom = atom((get) => `${API_ENDPOINT_BASE}/${get(presetSuffixAtom)}`)

// async here 

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
    );
}

export const Presets = () => {
    const preset = useAtomValue(presetAtom);
    const setPresetIndex = useUpdateAtom(presetIndexAtom);

    const handleChange = (value: string) => setPresetIndex(parseInt(value))

    return (
        <ToolbarToggleGroup 
            aria-label="Text alignment"
            type="single" 
            value={preset} 
            onValueChange={handleChange} 
            disabled={false}
        >
            {presets.map((preset: IPreset, index: number) => {
                return (
                    <ToolbarToggleItem 
                        key={index}
                        value={preset.index}
                        aria-label={preset.label}
                    >
                        <Text size='1'> {preset.id} </Text>
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    );
}

const Controller = () => {

    return (
        <Toolbar aria-label='Timeseries-controls'>
            <TimeSelectionGroup />
            <ToolbarSeparator />
            <Presets />
            <ToolbarButton css={{ marginLeft: 'auto' }}>Share</ToolbarButton>
        </Toolbar>
    );
}

export default Controller