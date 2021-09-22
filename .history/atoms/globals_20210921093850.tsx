

import { atom } from 'jotai'
import { mainMenuItems } from './constants'

export const activeMainMenuPanelAtom = atom(mainMenuItems[0].value)

type LocaleType = 'en-US' | 'en-UK' | 'ru-RU' | 'ja-JP' | 'en-IN' | 'de-DE' 

enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU',
    JA_JP = 'ja-JP',
    EN_IN = 'en-IN',
    DE_DE = 'de-DE',
    EN_UK = 'en-UK'
}

export const getFormatForLocale = (updatedLocale: string): LocaleType => {
    if(updatedLocale==='en-US') return LocaleEnum.EN_US;
    if(updatedLocale==='ru-RU') return LocaleEnum.RU_RU;
    return LocaleEnum.EN_US; 
}

export const localeAtom = atom<LocaleType>(LocaleEnum.EN_US)
export const localeFormatAtom = atom(
    (get) => get(localeAtom),
    (_get, set, updatedLocale: string) => {
        if(updatedLocale?.length) set(localeAtom, getFormatForLocale(updatedLocale)) 
    }
);
