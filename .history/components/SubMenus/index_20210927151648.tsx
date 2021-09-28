import React from 'react'
import { useAtom } from 'jotai'

import {  
    MainMenuHeader as Header, 
    MainMenuHeading as Heading,
    MainMenuContent as Content,
    MainMenuDivider as Divider,
    MainMenuDescription as Description,
    MainMenuPanel as Panel
} from '../../primitives/Panels'

import { 
    ITabItem, 
    TabsContainer 
} from '../../compositions/Tabs'

import {
    descriptions
} from './constants'

import {
    OrientationEnum,
    DirectionEnum,
    SizeEnum 
} from '../../compositions/interfaces'

import {
    mainMenuItems
} from '../../atoms/constants'
import {
    activeMainMenuPanelAtom
} from '../../atoms/globals'

const PanelWrapper = ({ submenu }: { submenu: ITabItem }) => (
    <Panel>
        <Header>
            <Heading> 
                {submenu.icon}
                {submenu.value.toUpperCase()}  
            </Heading>
            <Description size='2'> 
                {descriptions[parseInt(submenu.id)]} 
            </Description>
        </Header>
        <Divider />
        <Content> {submenu.content} </Content>
    </Panel> 
);


const mainMenuPanels: ITabItem[] = mainMenuItems.map((menuItem) => {
    return {
        ...menuItem,
        content: <PanelWrapper submenu={menuItem} />,
    }
});

const useUserAuth = ({ }) => 

const TabulatedMenu = () => {
    const [activePanel, setActivePanel] = useAtom(activeMainMenuPanelAtom)
    
    const handleTabChange = (updatedPanel: string) => setActivePanel(updatedPanel)

    return (
        <>
        <TabsContainer 
            size={SizeEnum.LARGE} 
            orientation={OrientationEnum.HORIZONTAL} 
            direction={DirectionEnum.LTR}
            items={mainMenuPanels} 
            value={activePanel}
            onChange={handleTabChange} 
        />
        <Text size='3' css={{ color: '$funkyText'}}>
            hihihihi
        </Text>
        </>
    )
}

export default TabulatedMenu

