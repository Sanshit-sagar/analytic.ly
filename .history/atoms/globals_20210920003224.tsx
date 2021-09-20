

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


export const localeAtom = atom(LocaleEnum.EN_US)
export const localeFormatAtom = (
    (get) => get(localeAtom),
    (get,set,updatedLocale: LocaleType) => {
        set(localeAtom, getFormat(updatedLocale))
    }
)