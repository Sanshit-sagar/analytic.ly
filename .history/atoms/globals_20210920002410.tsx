

import { atom } from 'jotai'

enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU',
    JA_JP = 'ja-JP',
    EN_IN = 'en-IN',
    DE_DE = 'de-DE',
};

export const localeAtom = atom(LocaleEnum.EN_US)
export const 