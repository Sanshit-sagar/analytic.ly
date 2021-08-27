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
    onChange: any;
    presets: Preset[]; 
}


const PresetToggleButtons: React.FC<{
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | undefined) => void}> = ({ 
        
value, 
defaultValue, o
nChange 
}) => {

React.FC = ({ value, onChange, presets }: PresetToggleProps) => {

    const [selected, setSelected] = useState(0)
   
    return (
        <ToolbarToggleGroup 
            type='single' 
            value={selected}
            onValueChange={(updatedIndex: number) => {
                setSelected(updatedIndex);
            }}
            disabled={false}
            aria-label='Time Filter Presets'
        >
            {presets.map((preset: Preset, index: number) => {
                return (
                    <ToolbarToggleItem
                        as="button" 
                        key={index}
                        value={preset.index}
                    >
                       {preset.label} ({preset.value})
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    )
}

export default PresetToggleButtons