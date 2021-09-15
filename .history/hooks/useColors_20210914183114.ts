import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { activeThemeIndexAtom } from '../components/Swatch'

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
} from '../stitches.config'

export const activeThemeIdAtom = atom((get) => themes[get(activeThemeIndexAtom)].id)
export const activeThemeObjectAtom = atom((get) => themes[get(activeThemeIndexAtom)].className)
export const activeThemeColorsAtom = atom((get) => get(activeThemeObjectAtom))

export const themes = [
    { index: 0, id: 'default-theme',name:'Default Theme', className: defaultTheme, color: 'white' },
    { index: 1, id: 'default-dark',name: 'Default Dark', className: defaultDark, color: 'black' },
    { index: 2, id: 'theme1-light', name: 'Theme1 [Light]', className: theme1Light, color: 'white' },
    { index: 3, id: 'theme1-dark', name: 'Theme1 [Dark]', className: theme1Dark,  color: 'purple' },
    { index: 4, id: 'theme2-light', name: 'Theme2 [Light]', className: theme2Light, color: 'white'},
    { index: 5, id: 'theme2-dark', name: 'Theme2 [Dark]', className: theme2Dark, color: 'pink'},
    { index: 5, id: 'theme3-light', name: 'Theme3 [Light]', className: theme3Light,  color: 'white'},
    { index: 6, id: 'theme3-dark', name: 'Theme3 [Dark]', className: theme3Dark, color: 'green' },
    { index: 7, id: 'theme4-light', name: 'Theme4 [Light]', className: theme4Light,  color: 'white' },
    { index: 8, id: 'theme4-dark', name: 'Theme4 [Dark]', className: theme4Dark, color: 'blue' },
]

export const getCurrentThemeId = () => {
    const activeThemeId = useAtomValue(activeThemeIdAtom)
    return activeThemeId
}

export const getCurrentThemeObject = () => {
    const activeThemeObject = useAtomValue(activeThemeObjectAtom)
    return activeThemeObject
}

export const useGloballyConsistentColors = () => {
    let activeThemeId = useAtomValue(activeThemeIdAtom)
    let activeThemeColors = useAtomValue(activeThemeObjectAtom)

    return {
        THEME_NAME: activeThemeId,
        THEME_ID: activeThemeId, 
        accent: activeThemeColors.colors.accent.value,
        neutral:  activeThemeColors.colors.neutral.value,
        panel:  activeThemeColors.colors.panel.value,
        canvas:  activeThemeColors.colors.canvas.value,
        loContrast:  activeThemeColors.colors.loContrast.value,
        hiContrast:  activeThemeColors.colors.hiContrast.value,
        text:  activeThemeColors.colors.text.value,
        funky: activeThemeColors.colors.funky.value,
        funkyText:  activeThemeColors.colors.funkyText.value, 
        border:  activeThemeColors.colors.border.value,
        border3:  activeThemeColors.colors.border3.value, 
        BACKGROUND_GRADIENT_FROM: activeThemeColors.colors.loContrast.value,
        BACKGROUND_GRADIENT_TO: activeThemeColors.colors.hiContrast.value,
        BACKGROUND: activeThemeColors.colors?.hiContrast.value
    }
}