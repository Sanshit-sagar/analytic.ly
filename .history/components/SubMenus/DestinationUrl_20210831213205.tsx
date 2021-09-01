import React, { useState } from 'react'
import { ReactNode } from 'react';



const TABS_ORIENTATION = 'horizontal'
const TABS_DIRECTION = 'ltr'

const Menu = ({ submenus }: { submenus: { id: string; label: string; icon: ReactNode; constent: any; }}) => {
    if(!submenus?.length) return null; 

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
                                    <Icon>{submenu.icon}</Icon>
                                    <Text as='span' size='3'>
                                        {submenu.label.toUpperCase()}
                                    </Text>
                                </Flex>
                            </TabsTrigger>
                        ); 
                    })}
                </TabsList>
                {submenus.map((submenu, i) => {
                    return (
                        <TabsContent value={submenu.id}>
                            <Box css={{ width: '100%', padding: '$3' }}>
                                <Flex css={{ width: '100%', fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
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
