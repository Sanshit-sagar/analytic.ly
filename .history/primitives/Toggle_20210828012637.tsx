import { styled } from '@stitches/react';
import { violet, mauve, blackA } from '@radix-ui/colors';
import * as TogglePrimitive from '@radix-ui/react-toggle';


const StyledToggle = styled(TogglePrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    color: mauve.mauve11,
    height: 35,
    width: 35,
    borderRadius: 4,
    display: 'flex',
    fontSize: 15,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    '&:hover': { 
        backgroundColor: violet.violet3 
    },
    '&[data-state=on]': { 
        backgroundColor: violet.violet6, 
        color: violet.violet12 
    },
    '&:focus': { boxShadow: `0 0 0 2px black` },
});

export const Toggle = StyledToggle