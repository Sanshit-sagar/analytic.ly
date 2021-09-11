import { styled } from '../stitches.config'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: '$accent',
    width: 25,
    height: 25,
    borderRadius: '100%',
    boxShadow: `0 2px 10px $accent`,
    '&:hover': { 
      backgroundColor: '$accentFull',
    },
    '&:focus': { 
        boxShadow: `0 0 0 2px $funky` 
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
    backgroundColor: '$panel'
  },
});

// Exports
export const RadioGroup = RadioGroupPrimitive.Root;
export const RadioGroupRadio = StyledRadio;
export const RadioGroupIndicator = StyledIndicator;