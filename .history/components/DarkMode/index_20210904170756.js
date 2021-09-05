import React, { useState, useEffect } from 'react'

import { theme1Dark, theme1Light } from '../../stitches.config'
import { darkModeAtom } from '../../pages/index'

import { ToggleButton } from '../../primitives/Toggle'
import { IconButton } from '../../primitives/IconButton'
import { Icon } from '../../primitives/Icon'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

import { useTheme } from 'next-themes'

const DarkMode = () => {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState('theme1-light')
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), []); 

    useEffect(() => {
        document.body.classList.remove('theme1-light', 'theme1-dark')
        document.body.classList.add(theme)
    }, [darkMode])

    if(!mounted) return null; 

    const toggleTheme = () => {
        const targetTheme = resolvedTheme==='theme1-light' ? 'theme1-dark' : 'theme1-light';
        setDarkMode(!darkMode)
        setTheme(targetTheme);  
    }

    return (
        <IconButton
            size='1'
            variant='raised'
            onClick={toggleTheme} 
            css={{ mr: '$5', bc: '$hiContrast', borderColor: '$funky', color: '$funky', '&:hover': { bc: '$accentHover', border: 'thin solid', borderColor: '$border3' } }}
        >
            <Icon label={`Dark Mode: ${!darkMode ? 'OFF' : 'ON'}`}>
                {darkMode ? <SunIcon /> : <MoonIcon />}
            </Icon>
        </IconButton>
    )
}

export default DarkMode 