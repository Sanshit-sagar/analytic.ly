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
    const [selected, setSelected] = useAtom(selectedIndexAtom)

    const handleSelectionChange = (updatedIndex: string) => {
        setSelected(parseInt(updatedIndex));
    }
   
    return (
        <ToolbarToggleGroup 
            type='single' 
            value={`${selected}`}
            onValueChange={handleSelectionChange}
            disabled={false}
            aria-label='Time Filter Presets'
        >
            {presets.map((preset: Preset, index: number) => {
                return (
                    <ToolbarToggleItem
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

export default ToggleButtons