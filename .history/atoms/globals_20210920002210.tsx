

import { atom } from 'jotai'

enum LocaleEnum {
    EN_US = 'en-US',
    RU_
}

const localeAtom = atom(LocaleEnum.EN_US)