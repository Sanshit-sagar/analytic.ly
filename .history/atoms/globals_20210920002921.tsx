

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

const LocaleAliases = {
    LocaleEnum.EN_US: [ 'United States', 'US', 'en-US', 'en_US', 'America'}
    'USA': LocaleEnum.EN_US,
    'US': LocaleEnum.EN_US,
    'en-US': LocaleEnum.EN_US,
    'UK': LocaleEnum.EN_UK,
    'United Kingdom': LocaleEnum.EN_UK,
    ''
}


export const localeAtom = atom(LocaleEnum.EN_US)
export const localeFormatAtom = (
    (get) => get(localeAtom),
    (get,set,updatedLocale: LocaleType) => {
        set
    }
)