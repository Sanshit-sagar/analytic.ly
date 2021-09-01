import React from 'react'

import { AppContainer } from '../primitives/Shared'
import DashboardLayout from '../layouts/DashboardLayout'

import { TextField } from '../primitives/TextField'
import { Heading } from '../primitives/Heading'
import { Button } from '../primitives/Button'
import { Text } from '../primitives/Text'
import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { 
    Tabs, 
    TabsList, 
    TabsTrigger, 
    TabsContent 
} from '../primitives/Tabs'

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
    return (
        <Text size='1' as='span'> 
            Destination Tab Content Here 
        </Text>
    );
}

const submenus = [
    { id: 'destination', value: 'destination', label: 'Destination', content: <DestinationTabContent />, icon: null, },
    { id: 'slug', value: 'slug', label: 'Slug', content: <SlugTabContent />, icon: null },
    { id: 'timeframe', value: 'timeframe', label: 'Timeframe', content: <TimeframeTabContent />, icon: null},
]

const Menu = () => {

    const updateActiveTab = (value: string) => setActiveTab(value);

    return (
        <Box css={{ border: 'thin solid', borderColor: '$accent', br: '$2' }}>
            <Tabs 
                orientation='horizontal' 
                dir='ltr'
                value={activeTab} 
                onValueChange={updateActiveTab}
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
                            <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
                                <Heading> SUBMENU {i}: {submenu.label} </Heading>
                                {submenu.content}
                            </Flex>
                        </TabsContent>
                    )
                })}
            </Tabs>
        </Box>   
    )

}



Menu.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <DashboardLayout> 
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}


export default Menu;