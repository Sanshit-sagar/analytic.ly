import { Flex } from '../primitives/Flex'
import { Label } from '../primitives/FieldSet'
import { Checkbox, CheckboxIndicator } from '../primitives/Checkbox'

import { CheckIcon } from '@radix-ui/react-icons'

export const CheckboxDemo = () => (
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
  