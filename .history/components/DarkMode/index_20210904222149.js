import React, { useState, useEffect } from 'react'

import { theme as defaultTheme, theme1Light, theme1Dark, theme2Light, theme2Dark } from '../../stitches.config'
import { darkModeAtom } from '../../pages/index'

import { IconButton } from '../../primitives/IconButton'
import { Icon } from '../../primitives/Icon'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'


const DarkMode = () => {
    const [theme, setTheme] = useState('default-theme')
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    useEffect(() => {
        alert(`the theme rn is ${theme}, need to toggle light/dark`)
    }, [darkMode])

    return (
        <IconButton
            size='1'
            variant='raised'
            onClick={() => {
                 setDarkMode(!darkMode)
                 setTheme(theme === 'theme2-light' ? theme2Dark : 'theme2-light')
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