import React from 'react';
import { styled } from '../stitiches.config'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: 'transparent',
    width: 25,
    height: 25,
    borderRadius: '100%',
    boxShadow: `0 2px 10px $accent`,
    '&:hover': { 
      backgroundColor: violet.violet3 
    },
  '&:focus': { boxShadow: `0 0 0 2px black` },
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
    backgroundColor: violet.violet11,
  },
});

// Exports
const RadioGroup = RadioGroupPrimitive.Root;
const RadioGroupRadio = StyledRadio;
const RadioGroupIndicator = StyledIndicator;