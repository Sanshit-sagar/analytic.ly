import React from 'react'

import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'

import { useOptionalControlledState } from '../hooks/useToggleGroup'

interface Preset {
    id: string;
    label: string;
    value: string; 
}

interface PresetToggleProps {
    
}



const PresetToggleButtons: React.FC = ({ value, defaultValue, onChange, presets }: PresetToggleProps) => {


    const [filter, setFilter] = useOptionalControlledState<string | undefined>({
        controlledValue: value,
        initialValue: presets[0].label,
        onChange,
    });
   
    return (
        <ToolbarToggleGroup 
            type='single' 
            value={`${filter}`}
            onValueChange={(updatedValue: string) => {
                setFilter(updatedValue);
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
                       {preset.label}
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    )
}

export default PresetToggleButtons