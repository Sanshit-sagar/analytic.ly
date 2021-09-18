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

export interface ITabItem {
    id: string; 
    value: string;
    name: string;
    content: React.ReactNode | undefined | null; 
    icon: Element | React.ForwardRefExoticComponent<React.IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}

export interface IHorizontalTabsProps {
    orientation: OrientationType;
    direction: DirectionType;
    value: string;
    onChange: (value: string) => void;
    items: ITabItem[];
}

export const EmptyTab = () => (
    <Text> no content for this tab </Text>
);

const DefaultTabs = ({ 
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
                    <Text size='2' css={{ width: '100%', fd: 'space-between', ai: 'center', gap: '$2'}}> 
                       <span> {item.icon || null} </span>
                       <span> {item.name} </span>
                    </Text>
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

export const HorizontalTabs = DefaultTabs 