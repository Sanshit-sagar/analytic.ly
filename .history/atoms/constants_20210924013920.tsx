import { ITabItem } from '../compositions/Tabs'

import { SlugSelectionTab } from '../components/SubMenus/SlugSelection/SlugTab'
import { SeoParametersTab } from '../components/SubMenus/SeoParameters'
import { SecurityTabContent } from '../components/SubMenus/SecurityTab'
import { ExpirationTabContent } from '../components/SubMenus/Calendar'
import { DestinationTabContent } from '../components/SubMenus/DestinationInput'

import {
    Link2Icon,
    StarIcon,
    LockClosedIcon,
    Crosshair2Icon,
    CalendarIcon
} from '@radix-ui/react-icons'

export const mainMenuItems: ITabItem[] = [
    { id: '0', value: 'Destination', name: 'Destination', content: <DestinationTabContent />, icon: <Link2Icon /> },
    { id: '1', value: 'Slug', name: 'Slug', content: <SlugSelectionTab />, icon: <StarIcon /> },
    { id: '2', value: 'SEO', name: 'SE0', content: <SeoParametersTab />, icon: <Crosshair2Icon /> },
    { id: '3', value: 'Expiration', name: 'Expiration',  content: <ExpirationTabContent />, icon: <CalendarIcon /> },
    { id: '4', value: 'Security', name: 'Security', content: <SecurityTabContent />, icon: <LockClosedIcon /> },
    // { id: '5', value: 'Async', name: 'Async', content: <AsyncListTest />, icon: <CalendarIcon /> }
    // { id: '5', value: 'A/B Testing', name: 'A/B Testing', content: <AbTestingTab />, icon: <PersonIcon /> },
    // { id: '6', value: 'QR Code', name:'QR Code', content: <QrCodeTab />, icon: <StarIcon />}
];