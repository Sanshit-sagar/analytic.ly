import React, { useState } from 'react'

import { 
    ToolbarButtonGroup,
    ToolbarGroupLabel,
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


const PresetToggleButtons: React.FC<PresetToggleProps>  = ({ value, presets }: PresetToggleProps) => {

    const [selectedValue, setSelectedValue] = useState(value)

    const handleSelectionChange = (updatedValue: React.SetStateAction<string>) => {
        setSelectedValue(updatedValue)
    }

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'st', gap: '$1'}}>
            <ToolbarGroupLabel> Presets </ToolbarGroupLabel> 
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
        </ToolbarButtonGroup>
    )
}

export default PresetToggleButtons