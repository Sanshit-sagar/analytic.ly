// import React, { useState } from 'react'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { theme as lightTheme, darkTheme } from '../stitches.config'

export const activeThemeIdAtom = atom((get) => get(darkModeAtom) ? 'dark-theme' : 'default-theme')
export const activeThemeObjectAtom = atom((get) => get(darkModeAtom) ? darkTheme : lightTheme)
export const activeThemeColorsAtom = atom((get) => get(activeThemeObjectAtom))

export const getCurrentThemeId = () => {
    // const darkMode = useAtomValue(darkModeAtom)
    // return darkMode ? 'default-theme' : 'dark-theme' 
    const activeThemeId = useAtomValue(activeThemeIdAtom)
    return activeThemeId
}

export const getCurrentThemeObject = () => {
    // const darkMode = useAtomValue(darkModeAtom)
    // return darkMode ? {...darkTheme} : {...lightTheme};
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
            BACKGROUND_GRADIENT_FROM: activeThemeColors.colors.violet100.value,
            BACKGROUND_GRADIENT_TO: activeThemeColors.colors.hiContrast.value,
            BACKGROUND: activeThemeColors.colors.hiContrast.value,
        };
    } catch (error) {
        return 
    }
}



// {
    // "colors":{
        // "violet100":{
            // "token":"violet100",
            // "value":"hsl(250 20% 10%)",
            // "scale":"colors",
            // "prefix":""
        // },
        // "violet200":{
        //    {"token":"violet300",
        //    "value":"hsl(252 40% 22%)",
        //    "scale":"colors",
        //    "prefix":""
        // },
        // "neutral":{
            // "token":"neutral",
            // "value":"var(--colors-violet100)",
            // "scale":"colors",
            // "prefix":""
        // },"funky":{
            // "token":"funky",
            // "value":"rgba(0,155,155,1.0)",
            // "scale":"colors",
            // "prefix":""
        // },
    // },
    // "className":"dark-theme",
    // "selector":".dark-theme",
// }}
// 