import React from 'react'
import { styled } from '../stitches.config'
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
  minWidth: 200,
  minHeight: '$6',
  maxWidth: 265,
  '&:focus': {
    outline: 'none',
  },
});

{/*

*/}

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
  <PopoverPrimitive.Trigger data-radix-popover-trigger {...props} ref={forwardedRef} />
)) as PopoverTriggerComponent;

export const PopoverClose = PopoverPrimitive.Close;