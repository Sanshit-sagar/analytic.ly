
import { ITabItem } from '../../compositions/Tabs'


import SlugTabContent from './SlugTab'

import { SeoParametersTab } from './SeoParameters'
import { SecurityTabContent } from './SecurityTab'
import { ExpirationTabContent } from './ExpirationTab'
import { DestinationTabContent } from './DestinationTab'
// import { AbTestingTab } from './AbTestingTab'
// import { QrCodeTab } from './QrCodeTab'

import {
    TargetIcon,
    Link2Icon,
    ClockIcon,
    LockClosedIcon,
    Crosshair2Icon,
    // PersonIcon,
} from '@radix-ui/react-icons'

// TODO: EMBED IN PNGS, RATE LIMITTER & WAITING ROOM, MANAGE CACHE, SECURITY HEADERS, FEATURE TOGGLES
export const descriptions: any = Object.values({
    'destination': 'Enter or type the URL that you would like to slugify',
    'slug': 'Customize the settings to generate a slug that best fits your needs',
    'seo': 'Start fine-tuning your analytics by templating SEO and UTM parameters',
    'abtesting': 'Split traffic and measure customer responses to new features',
    'timeframe': 'When should this slug self-detonate?',
    'security': 'Reset or toggle a passord at any time',
    'qrCode': 'Make your content avilable at the click of a picture',
    'share': 'Generate shareable links and messages for all your favourite platforms'
});