import React from 'react';
import { styled, keyframes } from '../stitches.config'
import { violet, blackA, red, mauve } from '@radix-ui/colors'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

function Root({ children, ...props }) {
  return (
    <AlertDialogPrimitive.Root {...props}>
      <StyledOverlay  />
      {children}
    </AlertDialogPrimitive.Root>
  );
}

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform',
  },
  '&:focus': { outline: 'none' },
});

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: mauve.mauve12,
  fontSize: 17,
  fontWeight: 500,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Button = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    fontWeight: 500,
    height: 35,
  
    variants: {
      variant: {
        red: {
            backgroundColor: '$panel',
            color: 'red',
            boxShadow: `0 2px 10px maroon`,
            '&:hover': { 
                backgroundColor: '$neutral' 
            },
            '&:focus': { 
                boxShadow: `0 0 0 2px crimson` 
            },
        },
        green: {
            backgroundColor: '$panel',
            color: 'lime',
            boxShadow: `0 2px 10px green`,
            '&:hover': { 
                backgroundColor: '$neutral' 
            },
            '&:focus': { 
                boxShadow: `0 0 0 2px emarald` 
            },
        },
        mauve: {
            backgroundColor: '$panel',
            color: '$accent',
            boxShadow: `0 2px 10px $accent`,
            '&:hover': { 
                backgroundColor: '$neutral' 
            },
            '&:focus': { 
                boxShadow: `0 0 0 2px $accent` 
            },
        },
      },
    },
  
    defaultVariants: {
      variant: 'violet',
    },
});


const AlertDialog = Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogContent = StyledContent
const AlertDialogTitle = StyledTitle
const AlertDialogDescription = StyledDescription
const AlertDialogAction = AlertDialogPrimitive.Action
const AlertDialogCancel = AlertDialogPrimitive.Cancel
const AlertButton = Button

