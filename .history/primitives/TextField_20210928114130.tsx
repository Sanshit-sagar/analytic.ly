//hi

import React from 'react';
import { styled, CSS, StitchesVariants } from '../stitches.config';

import type * as Polymorphic from '@radix-ui/react-polymorphic';

const DEFAULT_TAG = 'input';

const StyledTextField = styled(DEFAULT_TAG, {
  // Reset
  appearance: 'none',
  boxSizing: 'border-box',
  border: '1px solid $border',
  fontSize: '$3',
  width: '100%',
    '&::placeholder': {
     color: '$hiContrast',
  },
  '&:hover': {
    border: '1px solid $border3',
  },
  variants: {
    size: {
      '1': {
        height: 35,
        borderRadius: '$1',
        fontSize: '$3',
        padding: '$1',
        '&:-webkit-autofill::first-line': {
          fontSize: '$1',
        },
        bc: '$panel',
        color: '$text',
      },
      '2': {
        borderRadius: '$2',
        height: 70,
        fontSize: '$3',
        padding: '$2',
        lineHeight: '$sizes$6',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
      },
    },
    variant: {
      ghost: {
        color: '$text',
        backgroundColor: '$panel',
        '&:focus': {
            color: '$hiContrast',
            border: '2px solid $hiContrast',
            backgroundColor: '$loContrast',
        },
      },
    },
    state: {
      invalid: {
        borderColor: 'red',
        '&:hover': {
            color: 'rgba(255,0,0,0.7)'
        },
      },
      valid: {
        borderColor: 'green',
        '&:focus': {
            color: 'rgba(50,255,150,0.7)'
        },
      },
    },
    cursor: {
      default: {
        cursor: 'text',
        '&:focus': {
          cursor: 'text',
        },
      },
      text: {
        cursor: 'text',
      },
    },
  },
  defaultVariants: {
    size: '1',
    variant: 'ghost',
    cursor: 'text',
  },
});

type TextFieldCSSProp = { css?: CSS };
// TODO: Remove omit fix when this is merged https://github.com/modulz/stitches/issues/421
type TextFieldVariants = Omit<StitchesVariants<typeof StyledTextField>, 'size'>;
type TextFieldOwnProps = TextFieldCSSProp & TextFieldVariants & { size?: any };

type TextFieldComponent = Polymorphic.ForwardRefComponent<typeof DEFAULT_TAG, TextFieldOwnProps>;

export const TextField = React.forwardRef((props, forwardedRef) => {
  return <StyledTextField {...props} ref={forwardedRef} />;
}) as TextFieldComponent;

TextField.toString = () => `.${StyledTextField.className}`;