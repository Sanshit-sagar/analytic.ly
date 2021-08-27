import React from 'react';
import { 
    ToggleGroup,
    ToggleGroupItem
} from '../primitives/Toolbar'


export const TimeFilterPresets = [
    { id: '1d', label: 'Past 1 Day', value: '/1/day' },
    { id: '2d', label: 'Past 2 Days', value: '/2/day' },
    { id: '5d', label: 'Past 5 Days', value: '/3/day' },

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