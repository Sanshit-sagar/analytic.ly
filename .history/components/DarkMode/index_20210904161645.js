import React, { useState, useEffect } from 'react'

import { theme1Light, theme1Dark, theme2Light, theme2Dark } from '../../stitches.config'
import { darkModeAtom, themeAtom } from '../../pages/index'

import { ToggleButton } from '../../primitives/Toggle'
import { IconButton } from '../../primitives/IconButton'
import { Icon } from '../../primitives/Icon'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [theme, setTheme] = useAtom(themeAtom)

    useEffect(() => {
        document.body.classList.remove(theme1Light, theme1Dark, theme2Light, theme1Dark);
        document.body.classList.add(theme)
    }, [darkMode])

    return (
        <IconButton
            size='1'
            variant='raised'
            onClick={() => {
                 setDarkMode(!darkMode)
                 setTheme(invert
            }} 
            css={{ mr: '$5', bc: '$hiContrast', borderColor: '$funky', color: '$funky', '&:hover': { bc: '$accentHover', border: 'thin solid', borderColor: '$border3' } }}
        >
            <Icon label={`Dark Mode: ${!darkMode ? 'OFF' : 'ON'}`}>
                {darkMode ? <SunIcon /> : <MoonIcon />}
            </Icon>
        </IconButton>
    )
}

export default DarkMode 