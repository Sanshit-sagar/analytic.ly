import React from 'react'

import { AppContainer } from '../primitives/Shared'
import { DashboardLayout } from '../layouts/DashboardLayout'

import { TextField } from '../primitives/TextField'
import { Container } from '../primitives/Container'
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

const submenus = [
    { id: 'tab1', value: 'destinationLink', label: 'Destination Link', content: <DestinationLinkTabContent />, icon: null, },
    { id: 'tab1', value: 'chooseSlug', label: 'Slug', content: <ChooseSlugTabContent />, icon: null, },
]

const Menu = () => {

    return (
        <Box css={{ border: 'thin solid', borderColor: '$accent', br: '$2' }}>
            <Tabs 
                defaultValue="tab1" 
                orientation='horizontal' 
                dir='ltr'
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
                            
                        )
                    })}
                </TabsList>
                <TabsContent value='tab1'>
                    <Text as='subtitle' size='3'> Tab1 Content Here </Text>
                </TabsContent>
                <TabsContent value='tab2'>
                    <Text as='subtitle' size='3'> Tab2 Content Here </Text>
                </TabsContent>
                <TabsContent value='tab3'>
                    <Text as='subtitle' size='3'> Tab3 Content Here </Text>
                </TabsContent>
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