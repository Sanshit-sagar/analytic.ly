import React from 'react';
import { 
    ToggleGroup,
    ToggleGroupItem
} from '../primitives/Toolbar'


export const TimeFilterPresets = () => {
    [key: string]
}


const ToolbarToggleGroup: React.FC = () => {

    return (
        <ToolbarToggleGroup 
            type='single' 
            defaultValue='1/week/1/day' 
            aria-label='Time Filter Presets'
        >
            {}
            
        </ToolbarToggleGroup>
    )
}