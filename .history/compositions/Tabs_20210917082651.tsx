import React from 'react' 
import {
    Tabs,
    TabsSidebar,
    TabsContent as TabsContentLarge,
    TabsList,
    TabsTrigger,
    TabsSidebarContent as TabsContentSmall,
    TabsTriggerText
} from '../primitives/Tabs'

import { Text } from '../primitives/Text'
import { Tooltip } from '../primitives/Tooltip'
import { IconProps } from '@radix-ui/react-icons/dist/types'

type OrientationType = 'horizontal' | 'vertical'
type DirectionType = 'ltr' | 'rtl'

type ContentType = React.ReactNode | undefined | null
type IconType = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>

export interface ITabItem {
    id: string; 
    value: string;
    name: string;
    content: ContentType;
    icon: IconType;
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

const sanitize = (text: string) => `${text.substring(0,5)}${text.length > 5 ? '...' : ''}`

const Tabs = ({ 
    orientation = 'horizontal', 
    direction = 'ltr', 
    value, 
    onChange,
    items
}: IHorizontalTabsProps) => (

    <TabsSidebar
        orientation={orientation} 
        dir={direction} 
        value={value} 
        onValueChange={onChange}
    >
        <TabsList>
            {items.map((item: ITabItem, index: number) => (
                <Tooltip content={item.name}>
                    <TabsTrigger 
                        key={index} 
                        value={item.value}
                    >
                        <TabsTriggerText>
                            {item.icon || null} 
                        </TabsTriggerText>
                    </TabsTrigger>
                </Tooltip>
            ))}
        </TabsList> 
        
        {items.map((item: ITabItem, index: number) => (
            <TabsContentSmall
                key={index}
                value={item.value}
            >
                {item.content || <EmptyTab />}
            </TabsContentSmall>
        ))}
    </TabsSidebar>
)

export const HorizontalTabs = DefaultTabs 