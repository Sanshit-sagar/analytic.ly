import 
import { styled } from '@stitches/react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import type * as Radix from '@radix-ui/react-primitive';


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'inline-flex',
    backgroundColor: 'transparent',
});

const StyledToggleButtonItem = React.forwardedRef<
    React.ElementRef<typeof Button>,
    Radix.ComponentsWithoutPropRef<typeof Button>
>((props, forwardedRef) => (
    <Button variant='accent'>
        
    </Button>
)