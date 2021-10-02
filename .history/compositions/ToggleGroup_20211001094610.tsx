import React from 'react'

import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'
import { Flex } from '../primitives/Flex'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const ENDPOINT_BASE = 'http://localhost:3000/api/metrics/user/sanshit.sagar@gmail.com'
const INIT_ENDPOINT = `${ENDPOINT_BASE}/tail/1/month/weeks}`

export const valueAtom = atom('1m')
export const presentEndpointAtom = atom(`${INIT_ENDPOINT}`)

export interface Preset {
    id: string;
    index: number;
    label: string;
    value: string; 
}

const suffixForPreset: any = {
    '1d': '1/day/hours',
    '3d': '3/day/hours',
    '1w': '1/week/days',
    '1m': '1/month/weeks',
    '3m': '3/month/weeks',
    '1y': '1/year/weeks',
    'all': '1/year/months'
};

let presets: ToggleItem[] = [
    { id: '1d', index: 0, label: 'Past 1 Day', value: '/1/day' },
    { id: '2d', index: 1, label: 'Past 2 Days', value: '/2/day' },
    { id: '5d', index: 2, label: 'Past 5 Days', value: '/5/day' },
    { id: '1w', index: 3, label: 'Past 1 Week', value: '/1/week' },
    { id: '1m', index: 4, label: 'Past 1 Month', value: '/1/month' },
    { id: '3m', index: 5, label: 'Past 3 Months', value: '/3/month' },
    { id: '1y', index: 6, label: 'Past 1 Year', value: '/1/year' },
];    


const PresetToggleButtons: React.FC  = () => {
    const [selectedValue, setSelectedValue] = useAtom(valueAtom)
    const setPresetEndpoint = useUpdateAtom(presentEndpointAtom)

    const handleSelectionChange = (value: string) => {
        setSelectedValue(value)
        setPresetEndpoint(`${ENDPOINT_BASE}/tail/${suffixForPreset[value]}`)
    }

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}> 
            <ToolbarToggleGroup
                type='single' 
                value={selectedValue}
                onValueChange={(value: string) => handleSelectionChange(value)}
                disabled={false}
                aria-label='Time Filter Presets'
            >
                {presets.map((preset: Preset, index: number) => {
                    return (
                        <ToolbarToggleItem
                            as="button" 
                            key={index}
                            value={`${preset.index}`}
                        >
                           {preset.id}
                        </ToolbarToggleItem>
                    );
                })}
            </ToolbarToggleGroup>
        </Flex>
    )
}

export default PresetToggleButtons