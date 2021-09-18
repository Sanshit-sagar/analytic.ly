import React from 'react'
import { styled } from '../../stitches.config'
import { TabsContentSeparator } from '../../primitives/Tabs'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Heading } from '../../primitives/Heading'
import { Separator } from '../../primitives/Separator'

import SeoTabContent from './SeoTab'
import SlugTabContent from './SlugTab'
import { AbTestingTab } from './AbTestingTab'
import { SecurityTabContent } from './SecurityTab'
import { ExpirationTabContent } from './ExpirationTab'
import { DestinationTabContent } from './DestinationTab'

import { InputUrlWithInputUtmTags } from './Summary'
import { CustomDialog } from '../Dialog'

import { ITabItem, TabsContainer } from '../../compositions/Tabs'
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
    ml: '$2',
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
})

const PanelWrapper = ({ submenu }: { submenu: ITabItem }) => (
   
    <Flex css={{ height: '100%', width: '1000px', fd: 'column', jc: 'flex-start', ai: 'stretch', padding: '$1' }}>
        <Box css={{ width: '100%', maxWidth: 600, margin: '0 15px' }}>
            <Heading size='2'>
                {submenu.icon}
                {submenu.value.toUpperCase()} 
            </Heading>

            <Text size='2' css={{ mt: '$1', mb: '$2', color: '$text', fontSize:15, lineHeight: '20px', textTransform: 'lowercase'}}>
                {descriptions[parseInt(submenu.id)]}
            </Text>

            <Flex css={{ height: 20, alignItems: 'center' }}>
              <Text>Blog</Text>
              <Separator decorative orientation="vertical" css={{ margin: '0 15px' }} />
              <Text>Docs</Text>
              <Separator decorative orientation="vertical" css={{ margin: '0 15px' }} />
              <Text>Source</Text>
            </Flex>
        </Box>

        <TabsContentSeparator />

        <Flex css={{ width: '100%', height: '100%', fd: 'column', jc: 'center', ai: 'center', gap: '$1', pt: 0, pb: '$2', pl: '$1', pr: '$1' }}>     
            {submenu.content}
        </Flex>
    </Flex> 
);

const mainMenuItems: ITabItem[] = [
    { id: '0', value: 'Destination', name: 'Destination', content: <DestinationTabContent />, icon: <TargetIcon />, },
    { id: '1', value: 'Slug', name: 'Slug', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: '2', value: 'SEO', name: 'SE0',   displayName: 'SEO', content: <SeoTabContent />, icon: <Crosshair2Icon />},
    { id: '3', value: 'Expiration', name: 'Expiration',  content: <ExpirationTabContent />, icon: <ClockIcon />},
    { id: '4', value: 'Security', name: 'Security', content: <SecurityTabContent />, icon: <LockClosedIcon /> },
    { id: '5', value: 'A/B Testing', name: 'A/B Testing', content: <AbTestingTab />, icon: <PersonIcon /> },
]

const mainMenuPanels: ITabItem[] = mainMenuItems.map((menuItem) => {
    return {
        ...menuItem,
        content: <PanelWrapper submenu={menuItem} />,
    }
})

const activeMainMenuPanelAtom = atom(mainMenuItems[0].value)

const TabulatedMenu = () => {
    const [activePanel, setActivePanel] = useAtom(activeMainMenuPanelAtom)

    const handleTabChange = (updatedPanel: string) => setActivePanel(updatedPanel)

    return (
        <TabsContainer 
            size='large'
            orientation='horizontal' 
            direction='ltr'
            items={mainMenuPanels} 
            value={activePanel}
            onChange={handleTabChange} 
        />
    )
}

export default TabulatedMenu

