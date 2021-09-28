import React from 'react'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

import { Flex } from '../../primitives/Flex'
import { Tooltip } from '../../primitives/Tooltip'
import { IconButton } from '../../primitives/IconButton'

import { darkModeAtom } from '../../pages/index'
import { themes, activeThemeIndexAtom } from '../Swatch'
import { Switch, SwitchThumb } from '../../primitives/Switch'

const LIGHT = 'light'
const DARK = 'dark'

const isLight = (thematicState: string) => thematicState===LIGHT

export const getToggledIndex = (preToggleIndex: number) => {
    try {
        return isLight(themes[preToggleIndex].id.split('-')[1]) ? preToggleIndex + 1 : preToggleIndex - 1
    } catch(error) {
        console.error(error)
        return preToggleIndex; 
    }
}
    
export const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [activeThemeIndex, setActiveThemeIndex] = useAtom(activeThemeIndexAtom)

    const thematicToggle = () => {
        setDarkMode(!darkMode)
        setActiveThemeIndex(activeThemeIndex===0 ? 1 : activeThemeIndex===1 ? 0 : getToggledIndex(activeThemeIndex))
    }
    
    return (
        <IconButton
            size='1'
            variant='ghost'
            onClick={thematicToggle} 
            css={{ 
                margin: '0 $2', 
                mr: '$3',
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
            <Tooltip content={`Active Mode: ${!darkMode ? LIGHT : DARK}`}>
               { darkMode ? <SunIcon /> : <MoonIcon /> }
            </Tooltip>
        </IconButton>
    )
}

export const DarkModeAlt = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [activeThemeIndex, setActiveThemeIndex] = useAtom(activeThemeIndexAtom)

    const thematicToggle = () => {
        setDarkMode(!darkMode)
        setActiveThemeIndex(activeThemeIndex===0 ? 1 : getToggledIndex(activeThemeIndex))
    }
    
    return (
        <Flex css={{ alignItems: 'center', mr: '$3' }}>
            <Switch 
                 id='darkMode' 
                 checked={darkMode} 
                 onCheckedChange={thematicToggle}
             >
                <SwitchThumb />
            </Switch>
        </Flex>
    );
}