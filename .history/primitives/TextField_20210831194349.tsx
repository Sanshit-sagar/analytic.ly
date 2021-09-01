//hi

import React from 'react';
import { styled, CSS, StitchesVariants } from '../stiches.config';

import type * as Polymorphic from '@radix-ui/react-polymorphic';
import { mauve, blackA } from '@radix-ui/colors';

const DEFAULT_TAG = 'input';

const StyledTextField = styled(DEFAULT_TAG, {
  // Reset
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  border: 'thin solid',
  borderColor: '$hiContrast',
  fontFamily: 'inherit',
  margin: '0',
  outline: 'none',
  width: '100%',
  '&::placeholder': {
    color: '$hiContrast',
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        fontSize: '$1',
        height: 32,
        px: '$1',
        py: '$1',
        '&:-webkit-autofill::first-line': {
          fontSize: '$1',
        },
        backgroundColor: '$loContrast',
        color: '$hiContrast',
        border: '1px solid $slate8',
        width: '200px',
        '&:hover': {
          color: '$hiContrast',
          border: '1.5px solid $hiContrast',
          backgroundColor: '$loContrast',
        },
      },
      '2': {
        borderRadius: '$2',
        height: '$8',
        fontSize: '$3',
        px: '$2',
        lineHeight: '$sizes$6',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
      },
    },
    variant: {
      ghost: {
        boxShadow: 'none',
        color: '$hiContrast',
        border: '1px solid $hiContrast',
        backgroundColor: '$loContrast',
        '&:hover': {
            color: '$hiContrast',
            border: '1.5px solid $hiContrast',
            backgroundColor: '$loContrast',
        },
        '&:focus': {
            color: '$hiContrast',
            border: '1.5px solid $hiContrast',
            backgroundColor: '$loContrast',
        },
      },
    },
    state: {
      invalid: {
        backgroundColor: '$colors$red2',
        '&:focus': {
          boxShadow: 'none',
        },
      },
      valid: {
        backgroundColor: '$colors$green7',
        '&:focus': {
          boxShadow: 'none',
        },
      },
    },
    cursor: {
      default: {
        cursor: 'default',
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