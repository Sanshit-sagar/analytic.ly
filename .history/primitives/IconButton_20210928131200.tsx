import React from 'react'
import { styled, CSS, StitchesVariants } from '../stitches.config'
import  { greenDark, greenA } from '@radix-ui/colors'

import type * as Polymorphic from '@radix-ui/react-polymorphic'

const DEFAULT_TAG = 'button'

type IconButtonCSSProp = { css?: CSS }
type IconButtonVariants = StitchesVariants<typeof StyledIconButton>
type IconButtonOwnProps = IconButtonCSSProp & IconButtonVariants

const StyledIconButton = styled(DEFAULT_TAG, {
  // Reset
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'center',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  ml: '$1',
  mr: '$1',
  border: '1px solid $border',
  backgroundColor: 'transparent',
  color: '$accent',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  '@hover': {
    '&:hover': {
        backgroundColor: '$neutral',
        borderColor: '$border3',
    },
  },
  '&:active': {
        backgroundColor: '$accent2',
  },
  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    color: '$slate6',
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        width: '$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$6',
        width: '$6',
      },
      '3': {
        borderRadius: '$2',
        height: '$7',
        width: '$7',
      },
      '4': {
        borderRadius: '$3',
        height: '$8',
        width: '$8',
      },
    },
    variant: {
      ghost: {
        backgroundColor: 'transparent',
        border: '1px solid $border',
        borderRadius: '$1',
        '@hover': {
          '&:hover': {
            backgroundColor: '$accentHovered',
            borderColor: '$border3',
          },
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $accentContrast, 0 0 0 1px $accentContrast',
        },
        '&:active': {
          backgroundColor: '$accentFull',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
          backgroundColor: '$accent',
        },
      },
      raised: {
        boxShadow:
          '0 0 transparent, 0 16px 32px hsl(206deg 12% 5% / 25%), 0 3px 5px hsl(0deg 0% 0% / 10%)',
        '@hover': {
          '&:hover': {
            boxShadow:
              '0 0 transparent, 0 16px 32px hsl(206deg 12% 5% / 25%), 0 3px 5px hsl(0deg 0% 0% / 10%)',
          },
        },
        '&:focus': {
          borderColor: '$slate8',
          boxShadow:
            '0 0 0 1px $colors$slate8, 0 16px 32px hsl(206deg 12% 5% / 25%), 0 3px 5px hsl(0deg 0% 0% / 10%)',
        },
        '&:active': {
          backgroundColor: '$slate4',
        },
      },
      submit: {
          backgroundColor: greenA.greenA8,
          borderColor: greenDark.green5,
          color: greenDark.green10,
          '&:hover': {
            backgroundColor: greenA.greenA10,
            borderColor: greenDark.green10,
            color: '$text'
          },
      }
    },
    state: {
      active: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
          },
        },
        '&:active': {
          backgroundColor: '$slate4',
        },
      },
      waiting: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
          },
        },
        '&:active': {
          backgroundColor: '$slate4',
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
    variant: 'raised',
  },
});

type IconButtonComponent = Polymorphic.ForwardRefComponent<typeof DEFAULT_TAG, IconButtonOwnProps>;

export const IconButton = React.forwardRef((props, forwardedRef) => {
  return <StyledIconButton {...props} ref={forwardedRef} />;
}) as IconButtonComponent;
