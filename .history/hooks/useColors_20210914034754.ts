import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { themes, activeThemeIndexAtom } from '../components/Swatch'

export const activeThemeIdAtom = atom((get) => themes[get(activeThemeIndexAtom)].id)
export const activeThemeObjectAtom = atom((get) => themes[get(activeThemeIndexAtom)].className)
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
        BACKGROUND: activeThemeColors.colors?.hiContrast.value
        }
}