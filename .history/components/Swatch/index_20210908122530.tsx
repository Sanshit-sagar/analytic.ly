import React, { useEffect } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { IconButton } from '../../primitives/IconButton' 

import { 
    theme as defaultTheme,
    defaultDark,
    theme1Light, 
    theme1Dark, 
    theme2Light, 
    theme2Dark, 
    theme3Light,
    theme3Dark,
    theme4Light, 
    theme4Dark
} from '../../stitches.config'

import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose,
    PopoverArrow,
    PopoverHeading,
    PopoverSeparator
} from '../../primitives/Popover'

import { 
    DarkModeAlt as ActiveModeToggler 
} from '../DarkMode'

import { 
    Cross2Icon,
    LayersIcon,
    BlendingModeIcon
} from '@radix-ui/react-icons'

import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { darkModeAtom } from '../../pages/index'

interface ITheme {
    index: number; 
    id: string; 
    name: string; 
    className: any; 
    icon: any;
    color: string; 
};

export const themes: ITheme[] = [
    { index: 0, id: 'default-theme',name:'Default Theme', className: defaultTheme, icon:<BlendingModeIcon /> , color: 'white' },
    { index: 1, id: 'default-dark',name: 'Default Dark', className: defaultDark, icon:<BlendingModeIcon /> , color: 'black' },
    { index: 2, id: 'theme1-light', name: 'Theme1 [Light]', className: theme1Light, icon:<BlendingModeIcon />, color: 'white' },
    { index: 3, id: 'theme1-dark', name: 'Theme1 [Dark]', className: theme1Dark, icon:<BlendingModeIcon />, color: 'purple' },
    { index: 4, id: 'theme2-light', name: 'Theme2 [Light]', className: theme2Light, icon:<BlendingModeIcon />, color: 'white'},
    { index: 5, id: 'theme2-dark', name: 'Theme2 [Dark]', className: theme2Dark, icon:  <BlendingModeIcon />, color: 'pink'},
    { index: 5, id: 'theme3-light', name: 'Theme3 [Light]', className: theme3Light, icon: <BlendingModeIcon />, color: 'white'},
    { index: 6, id: 'theme3-dark', name: 'Theme3 [Dark]', className: theme3Dark, icon:  <BlendingModeIcon />, color: 'green' },
    { index: 7, id: 'theme4-light', name: 'Theme4 [Light]', className: theme4Light, icon: <BlendingModeIcon />, color: 'white' },
    { index: 8, id: 'theme4-dark', name: 'Theme4 [Dark]', className: theme4Dark, icon:  <BlendingModeIcon />, color: 'blue' },
];

const themeIds: string[] = themes.map((theme: ITheme, _: number) => theme.id)

export const activeThemeIndexAtom = atom(0)
export const activeThemeIdAtom = atom((get) => themes[get(activeThemeIndexAtom)].id)
export const activeThemeClassNameAtom = atom((get) => themes[get(activeThemeIndexAtom)].className)


interface IThematicaikonProps {
    key: string;
    theme: ITheme;
    index: number;
}

const Thematicaikon = ({ key, theme, index }: IThematicaikonProps) => {
    if(index%2===1) return null

    const setActiveThemeIndex = useUpdateAtom(activeThemeIndexAtom)
    const activeThemeIdStr = useAtomValue(activeThemeIdAtom)
    const isDark = useAtomValue(darkModeAtom)

    const handleRetheme = (updatedThemeIndex: number) => {
        let idx = updatedThemeIndex
        const darkIfLight =  idx - 1
        const lightIfDark =  idx + 1
        const shouldBeDarkButIsnt = isDark && idx%2===1
        const shouldBeLightButIsnt = !isDark && idx%2===0

        setActiveThemeIndex(shouldBeDarkButIsnt ? darkIfLight : shouldBeLightButIsnt ? lightIfDark : idx); 
    }
    let isInUse = activeThemeIdStr===theme.id

    return (
        <IconButton
            key={`theme-${key}`}
            onClick={() => handleRetheme(index)}
            css={{ 
                bc: theme.color, 
                mb: '$1', 
                mr: '$1', 
                outline: isInUse ? 'blue' : 'none' 
            }}
        >
            {theme.icon}
        </IconButton> 
    );
}

const ActiveThemeDisplay = () => {
    const activeThemeIdStr = useAtomValue(activeThemeIdAtom)
    return (
        <Text size='2' css={{ color: '$text', transform: 'uppercase' }}> 
            {activeThemeIdStr.split('-')[0]} 
        </Text>
    )
}

const Swatch = () => {
    const activeThemeIdStr = useAtomValue(activeThemeIdAtom)
    const activeThemeClassName = useAtomValue(activeThemeClassNameAtom)

    useEffect(() => {
        document.body.classList.remove(...themeIds)
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
                <PopoverHeading>
                    <ActiveThemeDisplay />
                    <ActiveModeToggler /> 
                </PopoverHeading>

                <PopoverSeparator />

                <Flex css={{ fd: 'row', ml: '$2', jc: 'flex-start', ai: 'flex-start', flexWrap: 'wrap', width: '225px', height: '100%' }}>
                    {themes.map((theme: ITheme, i: number) => (
                        <Thematicaikon 
                            key={`theme${i}`} 
                            theme={theme} 
                            index={i} 
                        /> 
                    ))}
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