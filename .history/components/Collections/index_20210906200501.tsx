import React from 'react' 
import {
    Tabs, 
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsContentSeparator
} from '../../primitives/Tabs'

import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import { UtmParameters } from '../SubMenus/SeoParameters/utmParameters'

import { atom, useAtom } from 'jotai'


const Templates = () => {

    return (
        <Box css={{ height: '300px', width: '300px' }}>
            <Text> TEMPLATES HERE </Text>
        </Box>
    )
}

const collectionsMap = {
    'urchins': 0,
    'templates': 1
}; 

const activeCollectionsTabStrAtom = atom('urchins')
// const activeCollectionsTabIndexAtom = atom((get) => collectionsMap[get(activeCollectionsTabStrAtom)])

const Collections = () => {
    const [activeTab, setActiveTab] = useAtom(activeCollectionsTabStrAtom)

    const handleTabChange = (value: string) => {
        setActiveTab(value)
    }

    return (
        <Tabs
            orientation={'horizontal'}
            dir={'ltr'}
            value={activeTab}
            onValueChange={handleTabChange}
        >
            <TabsList>
                <TabsTrigger value={'urchins'}> 
                    <Text> Urchins </Text>
                </TabsTrigger>
                <TabsTrigger value={'templates'}>
                    <Text> Templates </Text>
                </TabsTrigger>
            </TabsList>

            <TabsContent value={'urchins'}>
                <UtmParameters /> 
            </TabsContent>
            <TabsContent value={'templates'}>
                <Templates />
            </TabsContent>
        </Tabs>
    )
}