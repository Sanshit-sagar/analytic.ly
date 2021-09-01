import { styled } from '@stitches/react'
import { green, blackA } from '@radix-ui/colors'
import * as TogglePrimitive from '@radix-ui/react-toggle'


const StyledToggle = styled(TogglePrimitive.Root, {
    border: 'thin solid',
    br: '$2',
    margin: '$1',
    color: '$accent',
    backgroundColor: '$panel',
    borderColor: '$accent',
    border: 'thin solid',
    br: '$2',
    '&:hover': {
        backgroundColor: '$shadowDark',
        opacity: 0.8,
    },
    '&[data-state=on]': { 
        backgroundColor: green.green8, 
        color: green.green12 
    },
    '&:focus': { 
        boxShadow: `0 0 0 2px black` 
    },
});

export const ToggleButton = StyledToggle