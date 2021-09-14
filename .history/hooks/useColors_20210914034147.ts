import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { theme1Light, theme1Dark } from '../stitches.config'

export const activeThemeIdAtom = atom((get) => get(darkModeAtom) ? 'theme1-dark' : 'theme1-light')
export const activeThemeObjectAtom = atom((get) => get(darkModeAtom) ? theme1Dark : theme1Light)
export const activeThemeColorsAtom = atom((get) => get(activeThemeObjectAtom))

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

    try {
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
            accentContrast:  activeThemeColors.colors.accentContrast.value,
            accentPressed:  activeThemeColors.colors.accentPressed.value,
            accentHovered:  activeThemeColors.colors.accentHovered.value,
            BACKGROUND_GRADIENT_FROM: activeThemeColors.colors.loContrast.value,
            BACKGROUND_GRADIENT_TO: activeThemeColors.colors.hiContrast.value,
            BACKGROUND: activeThemeColors.colors.hiContrast.value,
        }
    } catch (error) {
        return {
            THEME_NAME: darkMode ? 'DARK' : 'LIGHT',
            THEME_ID: activeThemeId, 
            accent: darkMode ? '#000' : '#fff',
            neutral: darkMode ? '#000' : '#fff',
            panel:  
            canvas: 
            loContrast: 
            hiContrast: 
            text: darkMode ? '#000' : '#fff',
            accentContrast:  activeThemeColors.colors.accentContrast.value,
            accentPressed:  
            accentHovered:  darkMode ? '#000' : '#fff',
            BACKGROUND_GRADIENT_FROM: darkMode ? '#000' : '#fff',
            BACKGROUND_GRADIENT_TO: darkMode ? '#efefef' : '#121212',
            BACKGROUND: darkMode ? '#000' : '#fff',
        };
    }
}