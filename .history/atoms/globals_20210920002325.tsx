

import { atom } from 'jotai'

enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU',
    JA_JP = 'ja-JP',
    EN_IN
}

const localeAtom = atom(LocaleEnum.EN_US)