import { styled } from '../stitches.config'

import { Flex } from '../primitives/Flex'
import { 
    Checkbox as CheckboxPrimitive, 
    CheckboxIndicator 
} from '../primitives/Checkbox'

import { CheckIcon } from '@radix-ui/react-icons'

interface CheckboxProps {
    asChild?: boolean;
    checked: boolean;
    onCheckedChange: () => void; 
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    defaultChecked?: boolean;
    forceMount?: boolean; 
}

const Label = styled('label', {
    color: 'white',
    fontSize: 15,
    lineHeight: 1,
    userSelect: 'none',
});

export const Checkbox = (props: CheckboxProps) => {
    const { 
        checked, 
        onCheckedChange, 
        ...otherProps 
    } = props

    let id = `checkbox-${Math.random()}`
   
    return (
        <Flex css={{ alignItems: 'center' }}>
            <CheckboxPrimitive 
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
                {...otherProps}
            >
                <CheckboxIndicator>
                    <CheckIcon />
                </CheckboxIndicator>

            </CheckboxPrimitive>

            <Label htmlFor={}>
                Accept terms and conditions.
            </Label>
        </Flex>
    ); 
}
  

// asChild = false,
// defaultChecked,
// disabled,
// required,
// name,
// value = 'on',
// forceMount