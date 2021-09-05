// import React, { useState } from 'react'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../pages/index'
import { theme as lightTheme, darkTheme } from '../stitches.config'

const DEFAULT_ID = 'default-id'

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

export const useGloballyConsistentColors = ({ component_id = DEFAULT_ID }: { id: string }) => {

    const darkMode = useAtomValue(darkModeAtom)
    const activeThemeId = useAtomValue(activeThemeIdAtom)
    const activeThemeColors = useAtomValue(activeThemeColorsAtom)

    return {
        // COMPONENT: component_id,
        DARK_MODE: darkMode.toString(),
        THEME_ID: activeThemeId, 
        BACKGROUND: activeThemeColors,
    };
}


{"colors":{
    "violet100":{
        "token":"violet100",
        "value":"hsl(250 20% 10%)",
        "scale":"colors",
        "prefix":""},"violet200":{"token":"violet200","value":"hsl(255 30% 12%)","scale":"colors","prefix":""},"violet300":{"token":"violet300","value":"hsl(253 37% 18%)","scale":"colors","prefix":""},"violet400":{"token":"violet400","value":"hsl(252 40% 22%)","scale":"colors","prefix":""},"violet500":{"token":"violet500","value":"hsl(252 42% 26%)","scale":"colors","prefix":""},"violet600":{"token":"violet600","value":"hsl(251 44% 31%)","scale":"colors","prefix":""},"violet700":{"token":"violet700","value":"hsl(250 46% 38%)","scale":"colors","prefix":""},"violet800":{"token":"violet800","value":"hsl(250 51% 51%)","scale":"colors","prefix":""},"violet900":{"token":"violet900","value":"hsl(252 56% 57%)","scale":"colors","prefix":""},"violet1000":{"token":"violet1000","value":"hsl(251 63% 63%)","scale":"colors","prefix":""},"violet1100":{"token":"violet1100","value":"hsl(250 95% 76%)","scale":"colors","prefix":""},"violet1200":{"token":"violet1200","value":"hsl(252 87% 96%)","scale":"colors","prefix":""},"mauve100":{"token":"mauve100","value":"hsl(246 6% 9%)","scale":"colors","prefix":""},"mauve200":{"token":"mauve200","value":"hsl(240 5% 11%)","scale":"colors","prefix":""},"mauve300":{"token":"mauve300","value":"hsl(241 5% 14%)","scale":"colors","prefix":""},"mauve400":{"token":"mauve400","value":"hsl(242 4% 16%)","scale":"colors","prefix":""},"mauve500":{"token":"mauve500","value":"hsl(243 4% 18%)","scale":"colors","prefix":""},"mauve600":{"token":"mauve600","value":"hsl(244 4% 21%)","scale":"colors","prefix":""},"mauve700":{"token":"mauve700","value":"hsl(245 4% 25%)","scale":"colors","prefix":""},"mauve800":{"token":"mauve800","value":"hsl(247 4% 32%)","scale":"colors","prefix":""},"mauve900":{"token":"mauve900","value":"hsl(252 4% 45%)","scale":"colors","prefix":""},"mauve1000":{"token":"mauve1000","value":"hsl(247 3% 50%)","scale":"colors","prefix":""},"mauve1100":{"token":"mauve1100","value":"hsl(253 4% 63%)","scale":"colors","prefix":""},"mauve1200":{"token":"mauve1200","value":"hsl(256 6% 93%)","scale":"colors","prefix":""},"line":{"token":"line","value":"var(--colors-mauve300)","scale":"colors","prefix":""},"text":{"token":"text","value":"var(--colors-violet1200)","scale":"colors","prefix":""},"border":{"token":"border","value":"var(--colors-violet400)","scale":"colors","prefix":""},"border1":{"token":"border1","value":"var(--colors-violet500)","scale":"colors","prefix":""},"border2":{"token":"border2","value":"var(--colors-violet600)","scale":"colors","prefix":""},"border3":{"token":"border3","value":"var(--colors-violet700)","scale":"colors","prefix":""},"accent":{"token":"accent","value":"var(--colors-violet800)","scale":"colors","prefix":""},"accentHover":{"token":"accentHover","value":"var(--colors-violet900)","scale":"colors","prefix":""},"accentPressed":{"token":"accentPressed","value":"var(--colors-violet1000)","scale":"colors","prefix":""},"accentContrast":{"token":"accentContrast","value":"var(--colors-mauve1200)","scale":"colors","prefix":""},"darkestPanel":{"token":"darkestPanel","value":"var(--colors-mauve400)","scale":"colors","prefix":""},"darkPanel":{"token":"darkPanel","value":"var(--colors-mauve500)","scale":"colors","prefix":""},"panel":{"token":"panel","value":"var(--colors-mauve600)","scale":"colors","prefix":""},"lightPanel":{"token":"lightPanel","value":"var(--colors-mauve700)","scale":"colors","prefix":""},"lightestPanel":{"token":"lightestPanel","value":"var(--colors-mauve800)","scale":"colors","prefix":""},"canvas":{"token":"canvas","value":"var(--colors-mauve600)","scale":"colors","prefix":""},"loContrast":{"token":"loContrast","value":"hsl(260,80%,10%)","scale":"colors","prefix":""},"hiContrast":{"token":"hiContrast","value":"hsl(206,2%,93%)","scale":"colors","prefix":""},"neutral":{"token":"neutral","value":"var(--colors-violet100)","scale":"colors","prefix":""},"funky":{"token":"funky","value":"rgba(0,155,155,1.0)","scale":"colors","prefix":""}},"className":"dark-theme","selector":".dark-theme"}}
