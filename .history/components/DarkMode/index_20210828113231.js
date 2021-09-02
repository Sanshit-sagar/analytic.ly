import React, { useState, useEffect } from 'react'

import { darkTheme as darkThemeClassName } from '../../stitches.config'
import { darkModeAtom } from '../../pages/index'

import { ToggleButton } from '../../primitives/Toggle'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

const DarkMode = () => {
    const [theme, setTheme] = useState('theme-default')
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    useEffect(() => {
        document.body.classList.remove('theme-default', darkThemeClassName)
        document.body.classList.add(theme)
    }, [darkMode])

    return (
        <ToggleButton
            as="button"
            onClick={() => {
                 setDarkMode(!darkMode)
                 setTheme(theme === 'theme-default' ? darkThemeClassName : 'theme-default')
             }} 
             css={{ padding: '$1 $2', margin: '$1', border: 'thin solid', borderColor: '$accent', br: '$2' }}
        >
           {darkMode ? <SunIcon /> : <MoonIcon />}
        </ToggleButton>
    )
}

export default DarkMode 