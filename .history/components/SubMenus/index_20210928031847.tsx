import React from 'react'
import { useAtom } from 'jotai'
import { useUserAuth } from '../../hooks/useClerk'

import { Text } from '../../primitives/Text'

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
import { SubmissionUrl } from './Output'

const PanelWrapper = ({ submenu }: { submenu: ITabItem }) => (
    <Panel>
        <Header>
            <MainMenuHeading> 
                {submenu.icon}
                {submenu.value.toUpperCase()}  
            </Heading>
            <Description size='2'> 
                {descriptions[parseInt(submenu.id)]} 
            </Description>
        </Header>
        <Divider />
        <MainMenuContent> 
            {submenu.content} 
            <SubmissionUrl /> 
        </MainMenuContent>
    </Panel> 
);


const mainMenuPanels: ITabItem[] = mainMenuItems.map((menuItem) => {
    return {
        ...menuItem,
        content: <PanelWrapper submenu={menuItem} />,
    }
})



const TabulatedMenu = () => {   
    const { user, loading, error } = useUserAuth()

    const [activePanel, setActivePanel] = useAtom(activeMainMenuPanelAtom)
    const handleTabChange = (updatedPanel: string) => setActivePanel(updatedPanel)

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> Error! </Text>
    
    return (
        <TabsContainer 
            size={SizeEnum.LARGE} 
            orientation={OrientationEnum.HORIZONTAL} 
            direction={DirectionEnum.LTR}
            items={mainMenuPanels} 
            value={activePanel}
            onChange={handleTabChange} 
        />
    );
}

export default TabulatedMenu

