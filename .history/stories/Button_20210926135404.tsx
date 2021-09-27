import React from 'react';
import { Button as ButtonPrimitive } from '../primitives/Button' 
import { Text } from '../primitives/Text'

interface ButtonProps {
    color?: 'red' | 'green' | 'blue' | 'violet' | 'black' | 'transparent' 
    outlined?: boolean
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    radius?: '0' | '1' | '2' | '3' | '4'
    label: string;
    onClick?: () => void;
}

export const Button = ({
    color = 'blue',
    size = 'large',
    outlined = true,
    radius = '1',
    label = 'test_button',
    ...props
}: ButtonProps) => {
    
    return (
        <ButtonPrimitive
            type="button"
            size={size} 
            color={color} 
            outlined={outlined}
            radius={radius}
            {...props}
        >
            <Text css={{ color: ''}}> {label} </Text> 
        </ButtonPrimitive>
    );
}
