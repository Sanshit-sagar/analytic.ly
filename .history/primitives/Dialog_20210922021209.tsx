import React from 'react';
import { styled, keyframes } from '../stitches.config';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { IconButton } from './IconButton';
import { Button } from './Button'
import { green, crimson } from '@radix-ui/colors'

import type * as Polymorphic from '@radix-ui/react-polymorphic';

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
    children: React.ReactNode;
};

const overlayShow = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});
  
const contentShow = keyframes({
    '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
    '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'fixed',
    inset: 0,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 0.2)`,
    },
});

function Root({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: '$loContrast',
    borderRadius: 6,
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '45',
    width: '400px',
    overflowY: 'hidden',
    overflowX: 'hidden',
    padding: 25,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'transform',
    },
    '&:focus': {
        outline: 'none',
    },
});

const StyledCloseButton = styled(IconButton, {
    position: 'absolute',
    top: '$2',
    right: '$2',
});

const StyledTitle = styled(DialogPrimitive.Title, {
    margin: 0,
    fontWeight: 500,
    color: '$text',
    fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
    margin: '10px 0 20px',
    color: '$text',
    fontSize: 15,
    lineHeight: 1.5,
});

const StyledBody = styled('div', {
    display: 'flex',
    fd: 'column',
    jc: 'flex-start',
    ai: 'stretch', 
    gap: '$2',
    width: '100%', 
    height: '100%',
    border: 'thin solid $border'
})


const StyledActions = styled(Flex, {
    fd: 'row',
    jc: 'flex-end',
    ai: 'flex-end',
    gap: '$2',
    ml: '$2',
    mr: '$1',
    mt: '$2'
})
export const DialogTriggerButton = styled(Button, {
    color: 'green',
    size: 'medium'
});

export const StyledDialogClose = styled(DialogPrimitive.Close, {
    bc: 'transparent',
    margin: 0,
    padding: 0,
    border: 'none'
}); 
  
type DialogContentOwnProps = Polymorphic.OwnProps<typeof DialogPrimitive.Content> & { css?: any; };
type DialogContentComponent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof DialogPrimitive.Content>,
  DialogContentOwnProps
>;

export const DialogContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    <DialogPrimitive.Close as={StyledCloseButton} variant="ghost">
      <Cross1Icon />
    </DialogPrimitive.Close>
  </StyledContent>
)) as DialogContentComponent;


export const Dialog = Root 
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = StyledDialogClose
export const DialogBody = StyledBody
