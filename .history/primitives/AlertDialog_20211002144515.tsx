import React from 'react';
import { styled, keyframes } from '../stitches.config'
import { blackA } from '@radix-ui/colors'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { Flex } from './Flex'
import { IconButton } from './IconButton'

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

function Root({ 
    children, 
    ...props 
}: { 
    children: React.ReactNode; 
    props: any[] | any | undefined | null; 
}) {
  return (
    <AlertDialogPrimitive.Root {...props}>
      <StyledOverlay  />
      {children}
    </AlertDialogPrimitive.Root>
  );
}

const StyledContent = styled(AlertDialogPrimitive.Content, {
    backgroundColor: '$panel', 
    text: '$funkyText',
    br: '$1',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '500px',
    maxHeight: '85vh',
    padding: 25,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'transform',
    },
    '&:focus': { 
        outline: '1px ' 
    },
});

const StyledTitle = styled(AlertDialogPrimitive.Title, {
    margin: 0,
    color: '$accent',
    fontSize: 17,
    fontWeight: 500,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
    marginBottom: 20,
    color: '$funkyText',
    fontSize: 15,
    lineHeight: 1.5,
});

const AlertButton = styled('button', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$1',
    padding: '$2',
    ml: '$1', 
    mr: '$1',
  
    variants: {
        variant: {
            cancel: {
                backgroundColor: 'white',
                color: '$white',
                border: '1px solid $accent',
                '&:hover': {
                    backgroundColor: 'gainsboro',
                    borderColor: '$accentHover',
                },
                '&:focus': {
                    backgroundColor: '$gainsboro',
                    borderColor: '$accentPressed'
                }
            },
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
                '&:hover': { 
                    backgroundColor: '$neutral' 
                },
                '&:focus': { 
                    backgroundColor: `0 0 0 2px emarald` 
                },
            },
            accent: {
                backgroundColor: '$accent',
                color: '$text',
                '&:hover': { 
                    backgroundColor: '$accentHover' 
                },
                '&:focus': { 
                    boxShadow: `0 0 0 2px $accentPressed` 
                },
            },
        },
    },
    defaultVariants: {
        variant: 'accent',
    },
})

const StyledActions = styled(Flex, {
    fd: 'row',
    jc: 'flex-end',
    ai: 'flex-end',
    gap: '$2',
})


export const AlertDialog = Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogContent = StyledContent
export const AlertDialogTitle = StyledTitle
export const AlertDialogDescription = StyledDescription
export const AlertDialogAction = AlertDialogPrimitive.Action
export const AlertDialogCancel = AlertDialogPrimitive.Cancel
export const AlertDialogButton = AlertButton
export const AlertDialogActionsRow = StyledActions
