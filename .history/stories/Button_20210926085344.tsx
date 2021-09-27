import React from 'react';
import { Button as ButtonPrimitive } from '../primitives/Button' 

interface ButtonProps {
    color: 'red' | 'green' | 'black' | 'transparent' | 'accent' |  'gray' | 'violet'
    outlined?: boolean;
    size?: 'xsmall' | 'xsmall' | 'medium' | 'large' | 'xlarge'
    radius?: '$1' | '$2' | '$3' | '$4' | '$5' | '$6'
    label: string;
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
    color = 'accent',
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
            borderRadius={radius}
            {...props}
        >
            {label}
        </ButtonPrimitive>
    );
}
