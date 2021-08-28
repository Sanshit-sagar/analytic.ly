import React, { useState } from 'react'

import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'
import { Flex } from '../primitives/Flex'

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
    '3d': 'tail/1/day/hours',
    
}


const PresetToggleButtons: React.FC<PresetToggleProps>  = ({ value, presets }: PresetToggleProps) => {
    let activeEndpoint: string = `http://localhost:3000/api/metrics/user/sanshit.sagar@gmail.com/tail/1/month/weeks`

    const [selectedValue, setSelectedValue] = useState(value)
    const [presetEndpoint, setPresetEndpoint] = useState(activeEndpoint)

    const handleSelectionChange = (updatedValue: React.SetStateAction<string>) => {
        setSelectedValue(updatedValue)
        setPresetEndpoint(`http://localhost:3000/api/metrics/user/sanshit.sagar@gmail.com/${suffixForPreset[updatedValue]}`)
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