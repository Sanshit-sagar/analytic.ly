import React from 'react'
import { styled } from '../../stitches.config'
import {
    Tabs, 
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsContentSeparator
} from '../../primitives/Tabs'

import { Icon } from '../../primitives/Icon'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Heading } from '../../primitives/Heading'
import { Button } from '../../primitives/Button'

import SeoTabContent from './SeoTab'
import SlugTabContent from './SlugTab'
import { AbTestingTab } from './AbTestingTab'
import { SecurityTabContent } from './SecurityTab'
import { ExpirationTabContent } from './ExpirationTab'
import { DestinationTabContent } from './DestinationTab'
import { InputUrlWithInputUtmTags } from './Summary'

import { CustomDialog } from '../Dialog'

import { ITabItem, HorizontalTabs } from '../../compositions/Tabs'
import { atom, useAtom } from 'jotai'

import {
    TargetIcon,
    Link2Icon,
    ClockIcon,
    LockClosedIcon,
    Crosshair2Icon,
    PersonIcon,
} from '@radix-ui/react-icons'

// TODO: EMBED IN PNGS, RATE LIMITTER & WAITING ROOM, MANAGE CACHE, SECURITY HEADERS, FEATURE TOGGLES
const descriptions: any = Object.values({
    'destination': 'Enter or type the URL that you would like to slugify',
    'slug': 'Customize the settings to generate a slug that best fits your needs',
    'seo': 'Start fine-tuning your analytics by templating SEO and UTM parameters',
    'abtesting': 'Split traffic and measure customer responses to new features',
    'timeframe': 'When should this slug self-detonate?',
    'security': 'Reset or toggle a passord at any time',
    'qrCode': 'Make your content avilable at the click of a picture',
    'share': 'Generate shareable links and messages for all your favourite platforms'
});

export const MenuContainer = styled('div', {
    backgroundColor: '$hiContrast', 
    height: '600px', 
    width: '1000px', 
    border: '2px solid',
    borderColor: '$border3',
    maxWidth: '1100px', 
    br: '$2', 
    marginLeft: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1',
    display: 'flex',
    fd: 'column', 
    jc: 'center', 
    ai: 'center',
    gap: '$1',
});

export const TabsTriggerText = styled(Text, {
    width: '100%',
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$2',
    color: '$funkyText'
});




const PanelWrapper = ({ submenu }: { submenu: ITabItem }) => (
    <Flex css={{ height: '100%', fd: 'column', jc: 'space-between', ai: 'stretch', pb: '$3' }}>
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            <Heading size='2'>
                {submenu.icon}
                {submenu.value.toLowerCase()} 
            </Heading>

            <TabsContentSeparator />

            <Flex css={{ fd: 'column', jc: 'center', ai: 'stretch', gap: '$1', padding: 5 }}>     
                {submenu.content}
            </Flex>
        </Flex>
    </Flex> 
);

const mainMenuItems: ITabItem[] = [
    { id: 'destination', value: 'Destination', content: <DestinationTabContent />, icon: <TargetIcon />, },
    { id: 'slug', value: 'Slug', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'seo', value: 'SEO',  displayName: 'SEO', content: <SeoTabContent />, icon: <Crosshair2Icon />},
    { id: 'timeframe', value: 'Expiration', content: <ExpirationTabContent />, icon: <ClockIcon />},
    { id: 'security', value: 'Security', content: <SecurityTabContent />, icon: <LockClosedIcon /> },
    { id: 'abtesting', value: 'A/B Testing', content: <AbTestingTab />, icon: <PersonIcon /> },
]

const mainMenuPanels: ITabItem[] = mainMenuItems.map((menuItem) => {
    return {
        ...menuItem,
        content: <PanelWrapper submenu={menuItem} />,
    }
})

const activeMainMenuPanelAtom = atom(mainMenuItems[0].id)

const TabulatedMenu = () => {
    const [activePanel, setActivePanel] = useAtom(activeMainMenuPanelAtom)

    const handleTabChange = (updatedPanel: string) => setActivePanel(updatedPanel)

    return (

            <HorizontalTabs 
                orientation='horizontal' 
                direction='ltr'
                items={mainMenuPanels} 
                value={activePanel}
                onChange={handleTabChange} 
            />
    
    )
}
{/* <Text size='1' css={{ color: '$text', marginTop: 15, marginBottom: 15 }}>      */}
{/* {`${i < descriptions.length ? descriptions[i] : '--'}`}     */}
{/* </Text>  */}
export default TabulatedMenu

