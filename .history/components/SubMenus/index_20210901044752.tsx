import React, { useState } from 'react'

import {
    Tabs, 
    TabsList,
    TabsTrigger,
    TabsContent
} from '../../primitives/Tabs'

import { Box } from '../../primitives/Box'
import { Icon } from '../../primitives/Icon'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Heading } from '../../primitives/Heading'

import { DestinationTabContent } from './DestinationTab'
import { SlugTabContent } from './SlugTab'

import {
    TargetIcon,
    Link2Icon,
} from '@radix-ui/react-icons'

const TABS_ORIENTATION = 'horizontal'
const TABS_DIRECTION = 'ltr'

interface SubMenu {
    id: string; 
    label: string; 
    value: string; 
    icon: any; 
    content: any; 
}


const submenus: SubMenu[] = [
    { id: 'destination', value: 'destination', label: 'Destination', content: <DestinationTabContent />, icon: <TargetIcon />, },
    { id: 'slug', value: 'slug', label: 'Slug', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'seo', value: 'seo', label: 'SEO/UTM', content: <SeoTabContent />, icon: <ClockIcon />},
    { id: 'timeframe', value: 'timeframe', label: 'Timeframe', content: <TimeframeTabContent />, icon: <ClockIcon />},
    { id: 'security', value: 'security', label: 'Security', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'abtesting', value: 'abtesting', label: 'A/B Testing', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'routing', value: 'routing', label: 'Routing', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'blacklists', value: 'blacklist', label: 'Blacklists', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'cache', value: 'cache', label: 'Cache', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'qrCodes', value: 'qrCodes', label: 'QR Codes', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'share', value: 'share', label: 'Share', content: <SlugTabContent />, icon: <Link2Icon /> },
];

const TabulatedMenu = () => {
    const [activeTab, setActiveTab] = useState(submenus[0].id)
    const handleActiveTabChange = (value: string) => setActiveTab(value)

    return (
        <Tabs 
            orientation={TABS_ORIENTATION} 
            dir={TABS_DIRECTION}
            value={activeTab} 
            onValueChange={handleActiveTabChange}
        >
            <TabsList aria-label={`tabs-list-menu`}>
                {submenus.map((submenu, i) => {
                    return (
                        <TabsTrigger 
                            key={`submenu-${i}`} 
                            value={submenu.value} 
                        >
                            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>
                                <Icon 
                                    label={`${submenu.label}`}
                                    children={submenu.icon}
                                />
                                <Text as='span' size='3' css={{ fontWeight: 400 }}>
                                    {submenu.label.toUpperCase()}
                                </Text>
                            </Flex>
                        </TabsTrigger>
                    ); 
                })}
            </TabsList>
            {submenus.map((submenu, _: number) => {
                return (
                    <TabsContent value={submenu.id}>
                        <Box css={{ width: '100%', padding: '$3' }}>
                            <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
                                <Heading> {submenu.label} </Heading>
                                {submenu.content}
                            </Flex>
                        </Box>
                    </TabsContent>
                );
            })}
        </Tabs>
    );
}

export default TabulatedMenu

