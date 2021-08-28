import { styled } from '@stitches/react'
import { green, blackA } from '@radix-ui/colors'
import * as TogglePrimitive from '@radix-ui/react-toggle'


const StyledToggle = styled(TogglePrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    color: green.green11,
    height: 20,
    width: 20,
    borderRadius: 4,
    display: 'flex',
    fontSize: 15,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    '&:hover': { 
        backgroundColor: green.green3 
    },
    '&[data-state=on]': { 
        backgroundColor: green.green6, 
        color: green.green12 
    },
    '&:focus': { boxShadow: `0 0 0 2px black` },
});

export const ToggleButton = StyledToggle