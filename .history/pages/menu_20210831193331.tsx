import React, { useState } from 'react'

import { 
    AppContainer, 
    CentralDataVisualizer 
} from '../primitives/Shared'
import MenuLayout from '../layouts/MenuLayout'

import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { Button } from '../primitives/Button'
import { Heading } from '../primitives/Heading'
import { TextField } from '../primitives/TextField'
import { Separator } from '../primitives/Separator'

import { 
    Tabs, 
    TabsList, 
    TabsTrigger, 
    TabsContent 
} from '../primitives/Tabs'

import { 
    TargetIcon,
    Link2Icon,
    ClockIcon
} from '@radix-ui/react-icons'


const TimeframeTabContent = () => {
    return (
        <Text size='1' as='span'> 
            Timeframe Tab Content Here 
        </Text>
    );
}

const SlugTabContent = () => {
    return (
        <Text size='1' as='span'> 
            Slug Tab Content Here 
        </Text>
    );
}

const DestinationTabContent = () => {
    return <Text> Your Destination Goes Here ___</Text>;
}

const submenus = [
    { id: 'destination', value: 'destination', label: 'Destination', content: <DestinationTabContent />, icon: <TargetIcon />, },
    { id: 'slug', value: 'slug', label: 'Slug', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'timeframe', value: 'timeframe', label: 'Timeframe', content: <TimeframeTabContent />, icon: <ClockIcon />},
]

const TABS_ORIENTATION = 'horizontal'
const TABS_DIRECTION = 'ltr'

const Menu = () => {
    if(!submenus?.length) return null; 

    const [activeTab, setActiveTab] = useState(submenus[0].id)
    const handleActiveTabChange = (value: string) => setActiveTab(value)

    return (
        <CentralDataVisualizer>
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
                                <Text as='span' size='2'>
                                    {submenu.label}
                                </Text>
                            </TabsTrigger>
                        ); 
                    })}
                </TabsList>
                {submenus.map((submenu, i) => {
                    return (
                        <TabsContent value={submenu.id}>
                            <Box css={{ padding: '$3', }}>
                                <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
                                    <Heading> {submenu.label} </Heading>
                                    {submenu.content}
                                </Flex>
                            </Box>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </CentralDataVisualizer>   
    );
}



Menu.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <MenuLayout> 
                {page} 
            </MenuLayout>
        </AppContainer>
    )
}


export default Menu;