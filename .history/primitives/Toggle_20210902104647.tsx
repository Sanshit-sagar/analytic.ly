import { styled } from '@stitches/react'
import * as TogglePrimitive from '@radix-ui/react-toggle'


const StyledToggle = styled(TogglePrimitive.Root, {
    backgroundColor: 'transparent', 
    color: '$accent',
    border: 'thin solid',
    borderColor: '$accent',
    borderRadius: '5px',
    marginLeft: '$2',
    marginRight: '$2',
    padding: '$1 $2',
    '&[data-state=on]': { 
        color: '$hiContrast'
        import DashboardLayout from '../layouts/DashboardLayout'
    },
    '&:hover': {
        color: '$accentSuspectSoToll',
        backgroundColor: '$accentHover',
        opacity:0.9,
    }
});

export const ToggleButton = StyledToggle