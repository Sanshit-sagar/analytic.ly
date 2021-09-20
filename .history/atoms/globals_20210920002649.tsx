

import { atom } from 'jotai'

type LocaleType = 'en-US' | 'en-UK' | 'ru-RU' | 'ja-JP' | 'en-IN' | 'de-DE' 

const LocaleAliases = {
    'United States': 
}


export const localeAtom = atom(LocaleEnum.EN_US)
export const localeFormatAtom = (
    (get) => get(localeAtom),
    (get,set,updatedLocale: LocaleType) => {
        set
    }
)