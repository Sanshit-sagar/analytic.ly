import React from 'react'
import { atom, useAtom } from 'jotai'

import { Heading } from '../../primitives/Heading'
import {  
    MainMenuHeader, 
    MainMenuContent,
    MainMenuDivider,
    MainMenuDescription,
    MainMenuPanel
} from '../../primitives/Panels'

import { InputUrlWithInputUtmTags } from './Summary'


import { ITabItem, TabsContainer } from '../../compositions/Tabs'


const PanelWrapper = ({ submenu }: { submenu: ITabItem }) => (
   
    <MainMenuPanel>
        <MainMenuHeader>
            <Heading size='2'>
                {submenu.icon}
                {submenu.value.toUpperCase()} 
            </Heading>

            <MainMenuDescription size='2'>
                {descriptions[parseInt(submenu.id)]}
            </MainMenuDescription>
        </MainMenuHeader>

        <MainMenuDivider />

        <MainMenuContent>     
            {submenu.content}
        </MainMenuContent>
    </MainMenuPanel> 
)


const mainMenuPanels: ITabItem[] = mainMenuItems.map((menuItem) => {
    return {
        ...menuItem,
        content: <PanelWrapper submenu={menuItem} />,
    }
});


const activeMainMenuPanelAtom = atom(mainMenuItems[0].value)
const TabulatedMenu = () => {
    const [activePanel, setActivePanel] = useAtom(activeMainMenuPanelAtom)
    const handleTabChange = (updatedPanel: string) => setActivePanel(updatedPanel)

    return (
        <TabsContainer 
            size='large'
            orientation='horizontal' 
            direction='ltr'
            items={mainMenuPanels} 
            value={activePanel}
            onChange={handleTabChange} 
        />
    )
}

export default TabulatedMenu

