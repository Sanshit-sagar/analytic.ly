// import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { theme as lightTheme, darkTheme } from '../stitches.config'

const DEFAULT_ID = 'default-id'

const active

export const getCurrentThemeId = () => {
    const darkMode = useAtomValue(darkModeAtom)
    return darkMode ? 'default-theme' : 'dark-theme' 
}

export const getCurrentThemeObject = () => {
    const darkMode = useAtomValue(darkModeAtom)
    return darkMode ? {...darkTheme} : {...lightTheme};
}

export const useGloballyConsistentColors = (_id: string | number = DEFAULT_ID) => {

    const darkMode = useAtomValue(darkModeAtom)

    return {
        BACKGROUND: darkMode ? 
    }
}