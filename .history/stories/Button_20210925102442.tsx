import React, { useState } from 'react';
import { Button as ButtonPrimitive } from '../primitives/Button' 

// import { useAtomValue } from 'jotai/utils'
// import { darkModeAtom } from '../../pages/index'
// import { themes, activeThemeIndexAtom } from '../Swatch'

interface ButtonProps {
  /**
   * What is the color scheme for the button? 
   */
    color: 'red' | 'green' | 'black' | 'transparent' | 'accent'
  /**
   * To outline or not to outline 
   */
    outlined?: boolean;
  /**
   * How large should the button be?
   */
    size?: 'small' | 'medium' | 'large';
  /**
   * How rounded are the corners?
   */
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
