import React from 'react';
import { Button as ButtonPrimitive } from '../primitives/Button' 

interface ButtonProps {
    color: 'red' | 'green' | 'black' | 'transparent' | 'accent'
    outlined?: boolean;
    size?: 'xsmall' | 'medium' | 'large' | 'xlarge' 'small' | 'medium' | 'large';
    radius?: '1' | '2' | '3' | '4' | '5' | '6'
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
    radius = '2',
    label = 'test_button',
    ...props
}: ButtonProps) => {
    
    return (
        <ButtonPrimitive
            type="button"
            size='small' 
            {...props}
        >
            {label}
        </ButtonPrimitive>
    );
}
