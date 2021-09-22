import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: 'white',
    borderRadius: 6,
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '450px',
    maxHeight: '85vh',
    padding: 25,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'transform',
    },
    '&:focus': { 
        outline: 'none' 
    },
})
  
const StyledTitle = styled(DialogPrimitive.Title, {
    margin: 0,
    fontWeight: 500,
    color: mauve.mauve12,
    fontSize: 17,
})
  
const StyledDescription = styled(DialogPrimitive.Description, {
    margin: '10px 0 20px',
    color: mauve.mauve11,
    fontSize: 15,
    lineHeight: 1.5,
})

export function Dialog({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay />
      {children}
    </DialogPrimitive.Root>
  )
}

export const DialogContent = React.forwardRef(
    ({ children, ...props }, forwardedRef) => (
      <DialogPrimitive.Content {...props} ref={forwardedRef}>
        {children}
        <DialogPrimitive.Close>
          <Cross1Icon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    )
);
  
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close