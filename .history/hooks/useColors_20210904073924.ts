// import React, { useState } from 'react'
// import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { theme as lightTheme, darkTheme } from '../stitches.config'

const DEFAULT_ID = 'default-id'

const activeThemeIdAtom = ((get) => get(darkModeAtom) ? 'dark-theme' : 'default-theme')
const activeThemeObjectAtom = ((get) => get(darkModeAtom) ? darkTheme : lightTheme)

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

export const useGloballyConsistentColors = (_id: string | number = DEFAULT_ID) => {

    const darkMode = useAtomValue(darkModeAtom)

    return {
        BACKGROUND: darkMode ? 
    }
}