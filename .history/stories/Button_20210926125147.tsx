import React from 'react';
import { Button as ButtonPrimitive } from '../primitives/Button' 

interface ButtonProps {
    color: 'red' | 'green' | 'violet' | 'black' | 'transparent' | 'accent' |  'gray'
    outlined?: boolean
    size?: 'xsmall' | 'xsmall' | 'medium' | 'large' | 'xlarge'
    radius?: '$1' | '$2' | '$3' | '$4'
    label: string;
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
    color = 'red',
    size = 'large',
    outlined = true,
    radius = '$2',
    label = 'test_button',
    ...props
}: ButtonProps) => {
    
    return (
        <ButtonPrimitive
            type="button"
            size={size} 
            color={color} 
            outlined={outlined}
            borderR
            {...props}
        >
            {label}
        </ButtonPrimitive>
    );
}
