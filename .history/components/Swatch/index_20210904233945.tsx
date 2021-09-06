import React, { useEffect } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { IconButton } from '../../primitives/IconButton'

import { 
    theme as defaultTheme,
    theme1Light, 
    theme1Dark, 
    theme2Light, 
    theme2Dark, 
    theme3Light,
    theme3Dark
} from '../../stitches.config'

import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose,
    PopoverArrow
} from '../../primitives/Popover'

import { 
    Cross2Icon,
    LayersIcon 
} from '@radix-ui/react-icons'

import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const themes = [
    { id: 'default-theme', name: 'Default Theme', className: defaultTheme, icon:  <BlendingModeIcon />  },
    { id: 'theme1-light', name: 'Theme1 [Light]', className: theme1Light, icon:   <BlendingModeIcon /> },
    { id: 'theme1-dark', name: 'Theme1 [Dark]', className: theme1Dark, icon:  <BlendingModeIcon />  },
    { id: 'theme2-light', name: 'Theme2 [Light]', className: theme2Light, icon:  <BlendingModeIcon />  },
    { id: 'theme2-dark', name: 'Theme2 [Dark]', className: theme2Dark, icon:  <BlendingModeIcon />  },
    { id: 'theme3-light', name: 'Theme3 [Light]', className: theme3Light, icon:  <BlendingModeIcon />  },
    { id: 'theme3-dark', name: 'Theme3 [Dark]', className: theme3Dark, icon:  <BlendingModeIcon /> },
];

const activeThemeIndexAtom = atom(0)
const activeThemeIdAtom = atom((get) => themes[get(activeThemeIndexAtom)].id)
const activeThemeClassNameAtom = atom((get) => themes[get(activeThemeIndexAtom)].className)

const Swatch = () => {
    const setActiveThemeIndex = useUpdateAtom(activeThemeIndexAtom)
    const activeThemeIdStr = useAtomValue(activeThemeIdAtom)
    const activeThemeClassName = useAtomValue(activeThemeClassNameAtom)
    
    const handleRetheme = (updatedThemeIndex: number) => setActiveThemeIndex(updatedThemeIndex)

    useEffect(() => {
        document.body.classList.remove('default-theme', 'theme1-light', 'theme1-dark', 'theme2-light', 'theme2-dark', 'theme3-light', 'theme3-dark')
        document.body.classList.add(activeThemeClassName)
    }, [activeThemeIdStr, activeThemeClassName])

    return (
        
        <Popover>
            <PopoverTrigger aria-label={`Theme Selection`}>
                <IconButton>
                    <LayersIcon />
                </IconButton>
            </PopoverTrigger>

            <PopoverContent>
                <Flex css={{ flexDirection: 'column', gap: 10 }}>
                    <Text as='span' css={{ marginBottom: 10, color: '$loContrast', transform: 'uppercase' }}>
                        Current: {activeThemeIdStr}  
                    </Text>
                    <Flex css={{ fd: 'row', jc: 'space-evenly', ai: 'center'}}>
                        {themes.map((theme, i) => {
                            return (
                                <IconButton
                                    key={`theme-${i}`}
                                    onClick={() => handleRetheme(i)}
                                    
                                >
                                    {theme.icon}
                                </IconButton> 
                            );
                        })}
                    </Flex>
                </Flex>

                <PopoverArrow />
                <PopoverClose aria-label="Close">
                    <Cross2Icon />
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}

export default Swatch