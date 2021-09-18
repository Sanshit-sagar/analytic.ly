


import React from 'react' 
import {
    TabsSidebar as Tabs, 
    TabsList,
    TabsTrigger,
    TabsSidebarContent as TabsContent
} from '../primitives/Tabs'

import { Text } from '../primitives/Text'


type OrientationType = 'horizontal' | 'vertical'
type DirectionType = 'ltr' | 'rtl'

interface ITabItem {
    id: string; 
    value: string;
    name: string;
    content: React.ReactNode | undefined | null; 
}

interface IHorizontalTabsProps {
    orientation: OrientationType;
    direction: DirectionType;
    value: string;
    onChange: (value: string) => void;
    items: ITabItem[];
}

const EmptyTab = () => <Text> no content for this tab </Text>;

const HorizontalTabs = ({ 
    orientation = 'horizontal', 
    direction = 'ltr', 
    value, 
    onChange,
    items
}: IHorizontalTabsProps) => (

    <Tabs 
        orientation={orientation} 
        dir={direction} 
        value={value} 
        onValueChange={onChange}
    >
        <TabsList>
            {items.map((item: ITabItem, index: number) => (
                <TabsTrigger 
                    key={index} 
                    value={item.value}
                >
                    <Text> {item.name} </Text>
                </TabsTrigger>
            ))}
        </TabsList> 
        
        {items.map((item: ITabItem, index: number) => (
            <TabsContent 
                key={index}
                value={item.value}
            >
                {item.content || <EmptyTab />}
            </TabsContent>
        ))}
    </Tabs>
)

export DefaultTabs =