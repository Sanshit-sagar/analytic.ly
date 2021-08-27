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
    value: number;
    presets: Preset[]; 
}


const PresetToggleButtons: React.FC<{value?: string; defaultValue?: string=> void}> = ({    value, defaultValue  }) 
    => { React.FC = ({ initialIndex, presets }: PresetToggleProps) => {

    const [selected, setSelected] = useState(presets[initialIndex].value)
   
    return (
        <ToolbarToggleGroup 
            type='single' 
            value={selected}
            onValueChange={(updatedValue: string) => {
                setSelected(updatedValue);
            }}
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