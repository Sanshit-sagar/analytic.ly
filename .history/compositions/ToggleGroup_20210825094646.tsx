import React from 'react';
import { 
    ToggleGroup,
    ToggleGroupItem
} from '../primitives/Toolbar'


export const TimeFilterPresets = [
    { id: '1d', label: 'Past 1 Day', }
]


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