import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { themes, activeThemeIndexAtom } from '../components/Swatch'

import {
    defaultTheme, 
    defaultDark, 
    theme1Light, theme1Dark, theme2Light, theme2Dark,
    theme3Light, theme3Dark, theme4Light, theme4Dark
}

export const activeThemeIdAtom = atom((get) => themes[get(activeThemeIndexAtom)].id)
export const activeThemeObjectAtom = atom((get) => themes[get(activeThemeIndexAtom)].className)
export const activeThemeColorsAtom = atom((get) => get(activeThemeObjectAtom))


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


export const getCurrentThemeId = () => {
    const activeThemeId = useAtomValue(activeThemeIdAtom)
    return activeThemeId
}

export const getCurrentThemeObject = () => {
    const activeThemeObject = useAtomValue(activeThemeObjectAtom)
    return activeThemeObject
}

export const useGloballyConsistentColors = () => {

    const darkMode = useAtomValue(darkModeAtom)
    const activeThemeId = useAtomValue(activeThemeIdAtom)
    const activeThemeColors = useAtomValue(activeThemeColorsAtom)

    return {
        THEME_NAME: darkMode ? 'DARK' : 'LIGHT',
        THEME_ID: activeThemeId, 
        accent: activeThemeColors.colors.accent.value,
        neutral:  activeThemeColors.colors.neutral.value,
        panel:  activeThemeColors.colors.panel.value,
        canvas:  activeThemeColors.colors.canvas.value,
        loContrast:  activeThemeColors.colors.loContrast.value,
        hiContrast:  activeThemeColors.colors.hiContrast.value,
        text:  activeThemeColors.colors.text.value,
        BACKGROUND_GRADIENT_FROM: activeThemeColors.colors.loContrast.value,
        BACKGROUND_GRADIENT_TO: activeThemeColors.colors.hiContrast.value,
        BACKGROUND: activeThemeColors.colors?.hiContrast.value
    }
}