import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

export function Dialog({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay />
      {children}
    </DialogPrimitive.Root>
  );
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
  
  export const DialogTrigger = DialogPrimitive.Trigger;
  export const DialogClose = DialogPrimitive.Close;
const StyledButtonGroup = React.forwardRef(
    ({ children, ...props }, forwardedRef) => (
        <ToggleGroupPrimitive.Root {...props} ref={forwardedRef}>
            <StyledButton>
                {children}
            </StyledButton>
        </ToggleGroupPrimitive.Root>
    )
)

export const ButtonGroup = StyledButtonGroup