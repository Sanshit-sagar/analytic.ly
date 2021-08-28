import React from 'react'

import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'
import { Flex } from '../primitives/Flex'

import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const ENDPOINT = 'http://localhost:3000/api/metrics/user/sanshit.sagar@gmail.com
const INIT_SUFFIX = `${ENDPOINT}/${'1/month/weeks}`
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

const suffixForPreset = {
    '1d': 'tail/1/day/hours',
    '3d': 'tail/3/day/hours',
    '1w': 'tail/1/week/days',
    '1m': 'tail/1/month/weeks',
    '3m': 'tail/3/month/weeks',
    '1y': 'tail/1/year/weeks',
    'all': 'tail/1/year/months'
};


const PresetToggleButtons: React.FC<PresetToggleProps>  = ({ value, presets }: PresetToggleProps) => {
    const setSelectedValue = useUpdateAtom(valueAtom)
    const setPresetEndpoint = useUpdateAtom(presentEndpointAtom)

    const handleSelectionChange = (updatedValue: React.SetStateAction<string>) => {
        setSelectedValue(updatedValue)
        setPresetEndpoint(`http://localhost:3000/api/metrics/user/sanshit.sagar@gmail.com/${suffixForPreset[updatedValue]}`)
        // TODO: reset the MarketProvider 
        // TODO: call SWR and filter data -> dispatch update to filteded data in market context
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