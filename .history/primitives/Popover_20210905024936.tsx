import React from 'react'
import { styled, keyframes } from '../stitches.config'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { Box } from './Box'
import { panelStyles } from './Overlay'
import { Separator } from './Separator' 

import type * as Polymorphic from '@radix-ui/react-polymorphic';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
  const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  
  const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
  const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root> & {
  children: React.ReactNode;
};

export function Popover({ children, ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

const StyledContent = styled(PopoverPrimitive.Content, {
    ...panelStyles,
    br: '$2',
    border: '2px solid',
    borderColor: '$funky',
    p: '$2',
    bc: '$accent',
    fd: 'column', 
    jc: 'space-evenly', 
    ai: 'center',
    gap: '$1', 
    boxShadow: '$funky 0px 10px 38px -10px, $funky 0px 10px 20px -15px',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { 
                animationName: slideDownAndFade 
            },
            '&[data-side="right"]': { 
                animationName: slideLeftAndFade 
            },
            '&[data-side="bottom"]': { 
                animationName: slideUpAndFade 
            },
            '&[data-side="left"]': { 
                animationName: slideRightAndFade 
            },
        },
    },
    '&:focus': {
        boxShadow: `$accent 0px 10px 38px -10px, $accent 0px 10px 20px -15px, 0 0 0 2px $$accent`,
        outline: 'none',
        zIndex: 5
    }
});

const StyledSeparator = styled(Separator, {
    bc: '$hiContrast',
    color: '$funky', 
    width: '100%',
    mt: '$3',
    mb: '$3'
});

const StyledHeading = styled(CustomHeading, {
    color: '$accent',
    margin: '$1',
    '&:hover': {
        color: '$accentHover',
    },
})

const StyledTrigger = styled(PopoverPrimitive.Trigger, {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'transparent'
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
    fill: 'white',
});
  
const StyledClose = styled(PopoverPrimitive.Close, {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$accent',
    position: 'absolute',
    top: 5,
    right: 5,
  
    '&:hover': { 
        backgroundColor: '$accentHover'
    },
    '&:focus': { 
        boxShadow: `0 0 0 2px $$accent` 
    },
});

type PopoverContentOwnProps = Polymorphic.OwnProps<typeof PopoverPrimitive.Content> & {
  css?: any;
  hideArrow?: boolean;
};

type PopoverContentComponent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof PopoverPrimitive.Content>,
  PopoverContentOwnProps
>;

export const PopoverContent = React.forwardRef(({ children, hideArrow, ...props }, fowardedRef) => (
  <StyledContent sideOffset={2} {...props} ref={fowardedRef}>
    {children}
    {!hideArrow && (
      <Box css={{ color: '$panel' }}>
        <StyledArrow />
      </Box>
    )}
  </StyledContent>
)) as PopoverContentComponent;

type PopoverTriggerComponent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof PopoverPrimitive.Trigger>,
  Polymorphic.OwnProps<typeof PopoverPrimitive.Trigger>
>;

export const PopoverTrigger = React.forwardRef((props, forwardedRef) => (
  <StyledTrigger data-radix-popover-trigger {...props} ref={forwardedRef} />
)) as PopoverTriggerComponent;

export const PopoverClose = StyledClose
export const PopoverArrow = StyledArrow
export const PopoverHeading = StyledHeading
export const PopoverS