import React from 'react'

import { AppContainer } from '../primitives/AppContainer'

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

const Menu = () => {

    return (
        <Box css={{ border: 'thin solid', borderColor: '$accent', br: '$2' }}>
            <Tabs 
                defaultValue="tab1" 
                orientation='horizontal' 
                dir='ltr'
            >
                <TabsList aria-label={`tabs-list-menu`}>
                    <TabsTrigger value='tab1'> Destination Link </TabsTrigger>
                    <TabsTrigger value='tab2'> Choose a Slug </TabsTrigger>
                    <TabsTrigger value='tab3'> Timeframe </TabsTrigger>
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