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

type SizeType = 'small' | 'medium' | 'large'

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
    size: SizeType;
    orientation: OrientationType;
    direction: DirectionType;
    value: string;
    onChange: (value: string) => void;
    items: ITabItem[];
}

export const EmptyTab = () => (
    <Text> no content for this tab </Text>
);

const TabsHorizontalList = ({ items } : { items: ITabItem[] }) => (
    <TabsList>
       {items.map((item: ITabItem, index: number) => (
           <Tooltip key={index} content={item.name}>
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
)

export const TabsSidebarMenu = ({ 
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
        <TabsHorizontalList items={items} />
        
        {items.map((item: ITabItem, index: number) => (
            <TabsContentSmall
                key={index}
                value={item.value}
            >
                {item.content || <EmptyTab />}
            </TabsContentSmall>
        ))}
    </TabsSidebar>
);

interface ITabsContentWrapperProps {
    
}

const TabsContentWrapper = ({ key, size, content }: ITabsContentWrapperProps) => {

    return (size==='small') ? <TabsContentSmall key={index} value={item.value}/> : <TabsContentLarge key={index} value={item.value}/>
}

export const TabsMainMenu = ({
    size,
    orientation = 'horizontal', 
    direction = 'ltr', 
    value, 
    onChange,
    items
}: IHorizontalTabsProps) => {

    return (
        <Tabs
            orientation={orientation}
            dir={direction}
            value={value}
            onValueChange={onChange}
        >
           <TabsHorizontalList items={items} />

            {items.map((item: ITabItem, index: number) => (
                <TabsContentWrapper size={size} value={item.value} />

                <TabsContentSmall key={index} value={item.value}>
                    {item.content || <EmptyTab />}
                </TabsContentSmall>
            ))}
        </Tabs>
    )
};


const TabsContainer = (props: IHorizontalTabsProps) => {
    if(props.size==='small') {
        return <TabsSidebarMenu {...props} /> 
    } else {
        return <TabsMainMenu {...props} /> 
    }
}

