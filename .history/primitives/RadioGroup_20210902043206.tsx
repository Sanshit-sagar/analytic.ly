import { styled } from '@stitches/react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: '$panel',
    width: 25,
    height: 25,
    borderRadius: '100%',
    '&:hover': { 
        backgroundColor: '$accentHover' 
    },
    '&:focus': { 
        boxShadow: `0 0 0 2px`,
        boxShadowColor: `$accent`
    },
});

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
        content: '""',
        display: 'block',
        width: 11,
        height: 11,
        borderRadius: '50%',
        backgroundColor: '$accent3',
  },    
});

// Exports
export const RadioGroup = RadioGroupPrimitive.Root;
export const RadioGroupRadio = StyledRadio;
export const RadioGroupIndicator = StyledIndicator;