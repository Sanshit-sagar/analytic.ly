import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'

import { 
    styled, 
    theme as defaultTheme, 
    theme1Light, 
    theme1Dark, 
    theme2Light, 
    theme2Dark 
} from '../../stitches.config'

import { 
    darkModeAtom, 
    themeAtom 
} from '../../pages/index'
import { Icon } from '../../primitives/Icon'
import { IconButton } from '../../primitives/IconButton'
import { 
    themes, 
    activeThemeIndexAtom 
} from '../Swatch'
import { 
    SunIcon, 
    MoonIcon 
} from '@radix-ui/react-icons'


function getToggledIndex(preToggleIndex) {
   let lightOrDark = themes[preToggleIndex].id.split('-')[1]
   return (lightOrDark==='light') ? preToggleIndex + 1 : preToggleIndex - 1;
}

const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [activeThemeIndex, setActiveThemeIndex] = useAtom(activeThemeIndexAtom)

    const thematicToggle = () => {
        setDarkMode(!darkMode)
        setActiveThemeIndex(activeThemeIndex===0 ? 2 : getToggledIndex(activeThemeIndex))
    }
    
    return (
        <>
            <IconButton
                size='1'
                variant='raised'
                onClick={thematicToggle} 
                css={{ 
                    mr: '$5', 
                    bc: '$hiContrast', 
                    borderColor: '$funky', 
                    color: '$funky', 
                    '&:hover': { 
                        bc: '$accentHover', 
                        border: 'thin solid', 
                        borderColor: '$border3'
                    }
                }}
            >
                <Icon label={`Dark Mode: ${!darkMode ? 'OFF' : 'ON'}`}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Icon>
            </IconButton>
            <p> {themes[activeThemeIndex].id} </p>
        </>
    )
}

export default DarkMode 