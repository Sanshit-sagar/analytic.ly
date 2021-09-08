import React from 'react' 
import {
    Tabs, 
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsContentSeparator
} from '../../primitives/Tabs'

import { UtmParameters } from '../SubMenus/SeoParameters/utmParameters'



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

            <TabsContent value={'urchins'}
            </TabsContent>
        </Tabs>
    )
}