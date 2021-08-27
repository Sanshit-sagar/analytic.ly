import React, { useState } from 'react'

import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'

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


const PresetToggleButtons: React.FC<{
    value: string; 
    presets: Preset[];
}>  = ({ value, presets }: PresetToggleProps) => {

    const [selectedValue, setSelectedValue] = useState(value)

    const handleSelectionChange = (updatedValue: string) => {
        setSelectedValue(updatedValue)
    }
    
    return (
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
                       {preset.label} ({preset.value})
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    )
}

export default PresetToggleButtons