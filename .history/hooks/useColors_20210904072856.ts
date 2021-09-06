// import React, { useState } from 'react'
// import { atom, useAtom } from 'jotai'

import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { theme as lightTheme, darkTheme } from '../sti'

const DEFAULT_ID = 'default-id'

export const useGloballyConsistentColors = (_id: string | number = DEFAULT_ID) => {

    const darkMode = useAtomValue(darkModeAtom)

    return {
        BACKGROUND: darkMode ? 
    }
}