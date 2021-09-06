import React from 'react'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

import { Flex } from '../../primitives/Flex'
import { Icon } from '../../primitives/Icon'
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
    
const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [activeThemeIndex, setActiveThemeIndex] = useAtom(activeThemeIndexAtom)

    const thematicToggle = () => {
        // TODO: to be safe, return  math.min(themes.length-1, math.max(0, getToggleIndex(ati)))
        setDarkMode(!darkMode)
        setActiveThemeIndex(activeThemeIndex===0 ? 2 : getToggledIndex(activeThemeIndex))
    }
    
    return (
        <IconButton
            size='1'
            variant='raised'
            onClick={thematicToggle} 
            css={{ 
                margin: '$1 $2', 
                mr: '$3',
                padding: '$1 $1',
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
            <Icon 
                label={`Dark Mode: ${!darkMode ? LIGHT : DARK}`}
                children={darkMode ? <SunIcon /> : <MoonIcon />}
            />
        </IconButton>
    )
}

export const DarkModeAlt = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [activeThemeIndex, setActiveThemeIndex] = useAtom(activeThemeIndexAtom)

    const thematicToggle = () => {
        // TODO: to be safe, return  math.min(themes.length-1, math.max(0, getToggleIndex(ati)))
        setDarkMode(!darkMode)
        setActiveThemeIndex(activeThemeIndex===0 ? 2 : getToggledIndex(activeThemeIndex))
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

export default DarkMode 