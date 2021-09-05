import React, { useState, useEffect } from 'react'

import { darkTheme as darkThemeClassName, customTheme } from '../../stitches.config'
import { darkModeAtom } from '../../pages/index'

import { ToggleButton } from '../../primitives/Toggle'
import { IconButton } from '../../primitives/IconButton'
import { Icon } from '../../primitives/Icon'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

const DarkMode = () => {
    const [theme, setTheme] = useState('theme-default')
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    useEffect(() => {
        document.body.classList.remove('theme-default', darkThemeClassName, customTheme)
        document.body.classList.add(theme)
    }, [darkMode])

    return (
        <IconButton
            size='1'
            variant='raised'
            onClick={() => {
                 setDarkMode(!darkMode)
                 setTheme(theme === 'theme-default' ? darkThemeClassName : 'theme-default')
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