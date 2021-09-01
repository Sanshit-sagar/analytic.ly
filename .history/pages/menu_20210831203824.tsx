import React, { useState } from 'react'

import { AppContainer } from '../primitives/Shared'
import MenuLayout from '../layouts/MenuLayout'

import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { Icon } from '../primitives/Icon'
import { UrlFieldSet, Label } from '../primitives/FieldSet'
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
    const [destinationInput, setDestinationInput] = useState('')

    const handleInputChange = (event: React.ChangeEventHandler<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2' as='subtitle'> Enter the Destination URL below </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> DestinationURL </Label>
                <TextField 
                    size='2' 
                    type='url'
                    variant='ghost' 
                    value={destinationInput} 
                    onChange={handleInputChange} 
                    placeholder='www.example.com'
                    css={{ width: '100%' }}
                />
            </UrlFieldSet>
        </Flex>
    );
}

const submenus = [
    { id: 'destination', value: 'destination', label: 'Destination', content: <DestinationTabContent />, icon: <TargetIcon />, },
    { id: 'slug', value: 'slug', label: 'Slug', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'timeframe', value: 'timeframe', label: 'Timeframe', content: <TimeframeTabContent />, icon: <ClockIcon />},
    { id: 'security', value: 'security', label: 'Security', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'abtesting', value: 'abtesting', label: 'A/B Testing', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'routing', value: 'routing', label: 'Routing', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'blacklists', value: 'blacklist', label: 'Blacklists', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'cache', value: 'blacklist', label: 'Blacklists', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'qr', value: 'blacklist', label: 'Blacklists', content: <SlugTabContent />, icon: <Link2Icon /> },
]

const TABS_ORIENTATION = 'horizontal'
const TABS_DIRECTION = 'ltr'

const Menu = () => {
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