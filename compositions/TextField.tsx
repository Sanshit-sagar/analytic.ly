import React, { useRef, RefObject } from 'react'
import { useTextField } from '@react-aria/textfield'

import { 
    ControlGroup, 
    Label,
    LargeInput
} from '../primitives/FieldSet'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'

import { 
    InfoCircledIcon,
    CheckCircledIcon,
    CrossCircledIcon
} from '@radix-ui/react-icons'

interface IValidationProps {
    isValid: boolean;
}

const ValidationIcon = ({ isValid }: IValidationProps) => {
    return isValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}

const Validator = ({ isValid }: IValidationProps) => {
    const validationColor = isValid ? 'green' : 'red'

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>  
                <ValidationIcon isValid={isValid} />
            </Flex>
        </Text>
    );
}


export const TextField = (props: any) => {
    let ref: RefObject<HTMLInputElement | HTMLTextAreaElement> = useRef<HTMLInputElement | HTMLTextAreaElement>()
    let { labelProps, inputProps } = useTextField(props, ref)

    return (
        <ControlGroup>
            <Label {...labelProps}> 
                <>{props.label}</>
                <InfoCircledIcon />
            </Label>
            <LargeInput 
                {...inputProps}
                ref={ref}
            /> 
        </ControlGroup>
    )
}

