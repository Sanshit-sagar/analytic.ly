import React from 'react' 
import {
    Tabs, 
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsContentSeparator
} from '../../primitives/Tabs'

import { UtmParameters } from '../SubMenus/SeoParameters/utmParameters'

const Templates = () => {

    return (
        <Box css={{ height: '300px', width: '300px' }}></Box>
        <Text> TEMPLATES HERE </Text>
    )
}

const Collections = () => {

    return (
        <Tabs
            orientation={'horizontal'}
            dir={'ltr'}
            value={activeTab}
            onValueChange={handleTabChange}
        />
            <TabsList>
                <TabsTrigger value={'urchins'}> 
                    <Text> Urchins </Text>
                </TabsTrigger>
                <TabsTrigger value={'tempaltes'}>
                    <Text> Templates </Text>
                </TabsTrigger>
            </TabsList>

            <TabsContent value={'urchins'}>
                <UtmParameters /> 
            </TabsContent>
            <TabsContent value={'templates'>
                <Templates />
            </TabsContent>}
        </Tabs>
    )
}