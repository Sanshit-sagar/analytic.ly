import React from 'react';
import { styled } from '@stitches/react'
import { Button } from './Button'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type * as Radix from '@radix-ui/react-primitive';


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'inline-flex',
    backgroundColor: 'transparent',
});

const StyledToggleButtonItem = React.forwardedRef<
    React.ElementRef<typeof Button>,
    Radix.ComponentPropsWithoutRef<typeof Button>
>((props, forwardedRef) => (
    <Button {...props} ref={forwardedRef} />
); 