import React from 'react'

import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'

interface Preset {
    id: string;
    label: string;
    value: string; 
}

import { useOptionalControlledState } from '../hooks/useToggleGroup'










const PresetToggleButtons: React.FC = ({ presets }) => {


    const [filter, setFilter] = useOptionalControlledState<string | undefined>({
        controlledValue: value,
        initialValue: TimeFilters.P1D,
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