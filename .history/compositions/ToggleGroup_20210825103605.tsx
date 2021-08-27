import React from 'react'

import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'

import { useOptionalControlledState } from '../hooks/useToggleGroup'

export interface Preset {
    id: string;
    label: string;
    value: string; 
}

export interface PresetToggleProps {
    value: number;
    onChange: any;
    presets: Preset[]; 
}


const PresetToggleButtons: React.FC React.FC<{
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | undefined) => void;
  }> = ({ value, defaultValue, onChange }) => {

React.FC = ({ value, onChange, presets }: PresetToggleProps) => {


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