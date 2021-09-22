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