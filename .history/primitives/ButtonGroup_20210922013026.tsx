import { styled } from '@stitches/react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import type * as Radix from '@radix-ui/react-primitive';


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'inline-flex',
    backgroundColor: 'transparent',
});

const StyledToggleButtonItem = ({ children }: { IntrinsicAttributes & }) => {
    return (
        <Button variant='accent'>

        </Button>
    )
}