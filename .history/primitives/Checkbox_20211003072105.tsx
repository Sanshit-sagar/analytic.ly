import { styled } from '@stitches/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': { 
        backgroundColor: '$accent'
    },
    '&:focus': { 
        border: '1px solid $border'
    },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: '$accent'
});


export const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;


// import { CheckIcon } from '@radix-ui/react-icons';