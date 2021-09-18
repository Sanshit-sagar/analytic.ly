import { IconProps } from '@radix-ui/react-icons/dist/types'
import React from 'react' 
import {
    TabsSidebar as Tabs, 
    TabsList,
    TabsTrigger,
    TabsSidebarContent as TabsContent,
    TabsTriggerText
} from '../primitives/Tabs'

import { Text } from '../primitives/Text'

type OrientationType = 'horizontal' | 'vertical'
type DirectionType = 'ltr' | 'rtl'
type IconType = Element | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined

export interface ITabItem {
    id: string; 
    value: string;
    name: string;
    content: React.ReactNode | undefined | null; 
    icon: IconType 
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
                    <TabsTriggerText>
                       <span> {item.icon || null} </span>
                       <span> {item.name} </span>
                    </TabsTriggerText>
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