import React from 'react' 
import {
    TabsSidebar as Tabs, 
    TabsList,
    TabsTrigger,
    TabsSidebarContent as TabsContent
} from '../../primitives/Tabs'

import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import { UtmParameters } from '../SubMenus/SeoParameters/utmParameters'
import { atom, useAtom } from 'jotai'

const activeCollectionsTabStrAtom = atom('urchins')


type OrientationType = 'horizontal' | 'vertical'
type DirectionType = 'ltr' | 'rtl'

interface ITabItem {
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
}: IHorizontalTabsProps) => {

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
}

const tabItems: ITabItem[] = [
    { id: 0, value: 'urchins', name: 'Urchins', content: <UtmParameters />},
    { id: 1, value: 'templates', name: 'Templates', content: <EmptyT}
];

const SidePanel = () => {
    const [activePanel, setActivePanel] = useAtom(activeCollectionsTabStrAtom)

    const handleTabChange = (updatedTab: string) => setActivePanel(updatedTab);

    return (
        <HorizontalTabs 
            items={tabItems} 
            value={activePanel}
            onChange={handleTabChange} 
        />
    );
}

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

export default Collections