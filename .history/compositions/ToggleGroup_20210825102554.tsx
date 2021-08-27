import React from 'react';
import { PrimitiveAtom, atom, useAtom } from 'jotai' 
import { 
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'

interface Preset {
    id: string;
    label: string;
    value: string; 
}

const selectedIndexAtom: PrimitiveAtom<number> = atom(0)










const PresetToggleButtons: React.FC = () => {


    const [filter, setFilter] = useOptionalControlledState<string | undefined>({
        controlledValue: value,
        initialValue: TimeFilters.P1D,
        onChange,
    });
   
    return (
        <ToolbarToggleGroup 
            type='single' 
            value={`${selected}`}
            onValueChange={) => {
                setFilter(v);
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