import React, { useState } from 'react';
import { Button as ButtonPrimitive } from '../primitives/Button' 

// import { useAtomValue } from 'jotai/utils'
// import { darkModeAtom } from '../../pages/index'
// import { themes, activeThemeIndexAtom } from '../Swatch'

interface ButtonProps {
    color: 'red' | 'green' | 'black' | 'transparent' | 'accent'
    outlined?: boolean;
    size?: 'small' | 'medium' | 'large';
   radius?: '1' | '2' | '3' | '4' | '5' | '6'
  /**
   * Button contents
   */
    label: string;
  /**
   * Optional click handler
   */
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
    
    const [theme,setTheme] = useState<ThemeType>('default-theme')
    const [darkMode, setDarkMode] = useState<boolean>(false)

    return (
        <ButtonPrimitive
            type="button"
            {...props}
        >
            {label}
        </ButtonPrimitive>
    );
}
