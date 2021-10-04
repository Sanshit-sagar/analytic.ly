import { styled } from '../../../stitches.config'

import { Flex } from '../primitives/Flex'
import { Checkbox as CheckboxPrimitive, CheckboxIndicator } from '../primitives/Checkbox'

import { CheckIcon } from '@radix-ui/react-icons'

interface CheckboxProps {
    checked: boolean;
    onCheckedChange: () => void; 
}

const Label = styled('label', {
    color: 'white',
    fontSize: 15,
    lineHeight: 1,
    userSelect: 'none',
});

export const Checkbox = ({ checked, onCheckedChange }: CheckboxProps) => {
   
    return (
        <Flex css={{ alignItems: 'center' }}>
            <Checkbox 
                id="c1"
                defaultChecked
            >
                <CheckboxIndicator>
                    <CheckIcon />
                </CheckboxIndicator>
            </Checkbox>
            <Label htmlFor="c1">
                Accept terms and conditions.
            </Label>
        </Flex>
    ); 
}
  