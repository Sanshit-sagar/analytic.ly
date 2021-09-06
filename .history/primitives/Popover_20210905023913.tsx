import React from 'react'
import { styled, keyframes } from '../stitches.config'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Box } from './Box'
import { panelStyles } from './Overlay'

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
    pt: '$2', 
    pl: '$1', 
    pr: '$1',
    bc: '$accent',
    fd: 'column', 
    jc: 'space-evenly', 
    ai: 'center',
    gap: '$1', 
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
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
        boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px $$accent`,
        outline: 'none',
    }
});

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
  <StyledContent sideOffset={0} {...props} ref={fowardedRef}>
    {children}
    {!hideArrow && (
      <Box css={{ color: '$panel' }}>
        <PopoverPrimitive.Arrow width={11} height={5} offset={5} style={{ fill: 'currentColor' }} />
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