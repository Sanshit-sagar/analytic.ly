

import { atom } from 'jotai'


export const mainMenuItems: ITabItem[] = [
    { id: '0', value: 'Destination', name: 'Destination', content: <DestinationTabContent />, icon: <TargetIcon />, },
    { id: '1', value: 'Slug', name: 'Slug', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: '2', value: 'SEO', name: 'SE0', content: <SeoTabContent />, icon: <Crosshair2Icon />},
    { id: '3', value: 'Expiration', name: 'Expiration',  content: <ExpirationTabContent />, icon: <ClockIcon />},
    { id: '4', value: 'Security', name: 'Security', content: <SecurityTabContent />, icon: <LockClosedIcon /> },
    { id: '5', value: 'A/B Testing', name: 'A/B Testing', content: <AbTestingTab />, icon: <PersonIcon /> },
    { id: '6', value: 'QR Code', name:'QR Code', content: <QrCodeTab />, icon: <StarIcon />}
]
const activeMainMenuPanelAtom = atom(mainMenuItems[0].value)



type LocaleType = 'en-US' | 'en-UK' | 'ru-RU' | 'ja-JP' | 'en-IN' | 'de-DE' 

enum LocaleEnum {
    EN_US = 'en-US',
    RU_RU = 'ru-RU',
    JA_JP = 'ja-JP',
    EN_IN = 'en-IN',
    DE_DE = 'de-DE',
    EN_UK = 'en-UK'
}

export const getFormatForLocale = (updatedLocale: string): LocaleType => {
    if(updatedLocale==='en-US') return LocaleEnum.EN_US;
    if(updatedLocale==='ru-RU') return LocaleEnum.RU_RU;
    return LocaleEnum.EN_US; 
}

export const localeAtom = atom<LocaleType>(LocaleEnum.EN_US)
export const localeFormatAtom = atom(
    (get) => get(localeAtom),
    (_get, set, updatedLocale: string) => {
        if(updatedLocale?.length) set(localeAtom, getFormatForLocale(updatedLocale)) 
    }
);

// const LocaleAliases = [
//     [ 'United States', 'US', 'en-US', 'en_US', 'America'],
//     [ 'UK', 'United Kingdom' ],
// ]
