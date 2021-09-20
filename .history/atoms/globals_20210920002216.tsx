

import { atom } from 'jotai'

enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU'
}

const localeAtom = atom(LocaleEnum.EN_US)