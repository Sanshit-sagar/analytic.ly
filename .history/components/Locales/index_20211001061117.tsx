import React from 'react' 
import { WritableAtom, atom, useAtom } from 'jotai'
import SelectMenu, { IItem } from '../../compositions/SelectMenu'

export enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU',
    JA_JP = 'ja-JP',
    EN_IN = 'en-IN',
    DE_DE = 'de-DE',
    EN_UK = 'en-UK',
    EN_AU = 'en-AU',
    FR_FR = 'fr-FR'
}
export type LocaleType = (
    LocaleEnum.EN_US | LocaleEnum.EN_UK | LocaleEnum.EN_AU | LocaleEnum.FR_FR | 
    LocaleEnum.RU_RU | LocaleEnum.JA_JP | LocaleEnum.EN_IN | LocaleEnum.DE_DE 
); 

export const localeAtom = atom(LocaleEnum.FR_FR)
export const updateLocaleAtom: WritableAtom<LocaleType,LocaleType> = atom(
    (get) => get(localeAtom),
    (_get, set, updatedLocale: LocaleType) => {
       set(localeAtom, updatedLocale)
    }
);

let indicies: { [key: string]: number } = {
    'en-US': 0,
    'fr-FR': 1,
    'en-UK': 2,
    'en-AU': 3
}

export const messages: { [key: string]: { greeting: string; } } = {
    'en-US': {
      greeting: 'Hello, {firstName}!'
    },
    'fr-FR': {
      greeting: 'Bonjour, {firstName}!'
    },
    'en-UK': {
        greeting: 'Crikey, its the rozzers! {firstName}',
    },
    'en-AU': {
        greeting: 'A dingo ate my babey!!',
    },
};

const items = Object.keys(messages).map((key: string, i: number): IItem => {
    return {
        value: `${key}`,
        textValue: `${key}`, 
        icon: undefined, 
        alt: undefined
    }
})

export const LocaleSelector = () => {
    const [index, setIndex] = React.useState<number>(0)

    const handleChange = (v: number) => {
        setIndex(v)
    }

    return (
       <SelectMenu
            selectOnly={true}
            items={items}
            selectedIndex={index}
            setSelectedIndex={handleChange}
            selectedValue={items[index].value}
            selectedTextValue={<> <LetterCaseCapitalizeIcon /> <Text> items[index].value </Text> </
            group={'Locales'}
            css={{ margin: 0 }}
        /> 
    )
}
