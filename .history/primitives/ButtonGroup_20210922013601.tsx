import React from 'react';
import { styled } from '@stitches/react'
import { Button } from './Button'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type * as Radix from '@radix-ui/react-primitive';


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'inline-flex',
    backgroundColor: 'transparent',
});

const StyledButton = styled(Button, {
    bc: 'green',
    border: 'white',
    '&:hover': {
        bc: 'black',
    }
});

const StyledButtonGroupItem = React.forwardedRef<
    React.ElementRef<typeof StyledButton>,
    Radix.ComponentPropsWithoutRef<typeof StyledButton>
>((props, forwardedRef) => (
    <Button {...props} ref={forwardedRef} />
); 