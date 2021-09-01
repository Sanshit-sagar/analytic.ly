import { styled } from '@stitches/react'
import { green, blackA } from '@radix-ui/colors'
import * as TogglePrimitive from '@radix-ui/react-toggle'


const StyledToggle = styled(TogglePrimitive.Root, {
    backgroundColor: 'transparent', 
    color: '$accent',
    border: 'thin solid',
    borderColor: '$loContrast',
    mx: '$2',
    '&[data-state=on]': { 
        color: '$hiContrast'
    },
    '&:hover': {
        backgroundColor: '$accent',
        color: '$accentContrast',
        opacity:0.9,
    }
});

export const ToggleButton = StyledToggle