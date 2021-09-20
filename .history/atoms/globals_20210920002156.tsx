

import { atom } from 'jotai'

enum LocaleEnum {
    EN_US = 'en-US',
    
}

const localeAtom = atom(LocaleEnum.EN_US)