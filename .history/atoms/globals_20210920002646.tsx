

import { atom } from 'jotai'

type LocaleType = 'en-US' | 'en-UK' | 'ru-RU' | 'ja-JP' | 'en-IN' | 'de-DE' 

const LocaleAliases = {
    'United States': 
}

enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU',
    JA_JP = 'ja-JP',
    EN_IN = 'en-IN',
    DE_DE = 'de-DE',
};

export const localeAtom = atom(LocaleEnum.EN_US)
export const localeFormatAtom = (
    (get) => get(localeAtom),
    (get,set,updatedLocale: LocaleType) => {
        set
    }
)