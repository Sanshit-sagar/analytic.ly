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
export const presentEndpointAtom = atom(`${INIT_ENDPOINT)

export interface Preset {
    id: string;
    index: number;
    label: string;
    value: string; 
}

export interface PresetToggleProps {
    value: string;
    presets: Preset[]; 
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


const PresetToggleButtons: React.FC<PresetToggleProps>  = ({ value, presets }: PresetToggleProps) => {
    const [selectedValue,setSelectedValue] = useAtom(valueAtom)
    const setPresetEndpoint = useUpdateAtom(presentEndpointAtom)

    const handleSelectionChange = (updatedValue: React.SetStateAction<string>) => {
        setSelectedValue(updatedValue)
        setPresetEndpoint(`${ENDPOINT_BASE}/tail/${suffixForPreset[updatedValue]}`)
    }

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}> 
            <ToolbarToggleGroup
                type='single' 
                value={selectedValue}
                onValueChange={handleSelectionChange}
                disabled={false}
                aria-label='Time Filter Presets'
            >
                {presets.map((preset: Preset, index: number) => {
                    return (
                        <ToolbarToggleItem
                            as="button" 
                            key={index}
                            value={preset.value}
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