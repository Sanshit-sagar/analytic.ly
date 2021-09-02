import { styled } from '@stitches/react'
import { green, blackA } from '@radix-ui/colors'
import * as TogglePrimitive from '@radix-ui/react-toggle'


const StyledToggle = styled(TogglePrimitive.Root, {
    backgroundColor: 'transparent', 
    color: '$accent',
    border: 'thin solid',
    borderColor: '$loContrast',
    marginLeft: '$2',
    '&:first-child': { 
        marginLeft: 0 
    },
    '&:last-child': {
        marginRight: 0
    },
    '&[data-state=on]': { 
        // backgroundColor: '$accent',
        color: '$hiContrast'
    },
    '&:hover': {
        backgroundColor: '$accent',
        color: '$accentContrast',
        opacity:0.9,
    }
});

export const ToggleButton = StyledToggle