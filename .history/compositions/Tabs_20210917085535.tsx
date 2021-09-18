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

interface ITabsContentWrapperProps {
    index: number;
    size: string;
    value: string; 
    children: any; 
}

function isSmall(sizeText: string): boolean {
    return sizeText==='small';
}

const TabsContentWrapper = ({ index, size, value, children }: ITabsContentWrapperProps) => (isSmall(size) 
    ? <TabsContentSmall key={index} value={value}> {children} </TabsContentSmall>
    : <TabsContentLarge key={index} value={value}> {children} </TabsContentLarge>
);

const TabsSidebarMenu = ({ 
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

const TabsMainMenu = ({
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
                <TabsContentWrapper 
                    index={index} 
                    size={size} 
                    value={item.value}
                    children={item.content || <EmptyTab />}
                />
            ))}
        </Tabs>
    )
};


export const TabsContainer = (props: IHorizontalTabsProps) => {
    return isSmall(props.size) ? <TabsSidebarMenu {...props} /> : <TabsMainMenu {...props} /> 
}

