

import { atom } from 'jotai'

type LocaleType = 'en-US' | 'en-UK' | 'ru-RU' | 'ja-JP' | 'en-IN' | 'de-DE' 

enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU',
    JA_JP = 'ja-JP',
    EN_IN = 'en-IN',
    DE_DE = 'de-DE',
    EN_UK = 'en-UK'
};

// const LocaleAliases = [
//     [ 'United States', 'US', 'en-US', 'en_US', 'America'],
//     [ 'UK', 'United Kingdom' ],
// ]

export const getFormatForLocale = (updatedLocale: string): LocaleType => {
    if(updatedLocale==='en-US') return LocaleEnum.EN_US;
    if(updatedLocale==='ru-RU') return LocaleEnum.RU_RU;
    return LocaleEnum.EN_US; 
}

export const localeAtom = atom<LocaleType>(LocaleEnum.EN_US)
export const localeFormatAtom = (
    null,
    (_get, set: React.SetStateAction<LocaleType>, updatedLocale: LocaleType) => {
        if(!updatedLocale typeof LocaleType) return null; 
        set(localeAtom, getFormatForLocale(updatedLocale))
    }
);