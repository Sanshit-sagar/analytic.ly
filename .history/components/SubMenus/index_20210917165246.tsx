import React from 'react'
import { atom, useAtom } from 'jotai'

import {  
    MainMenuHeader, 
    MainMenuHeading,
    MainMenuContent,
    MainMenuDivider,
    MainMenuDescription,
    MainMenuPanel
} from '../../primitives/Panels'

import { ITabItem, TabsContainer } from '../../compositions/Tabs'
import { MainMenuDialog } from './MainMenuDialog'

import {
    descriptions,
    mainMenuItems
} from './constants'

const activeMainMenuPanelAtom = atom(mainMenuItems[0].value)

const PanelWrapper = ({ submenu }: { submenu: ITabItem }) => (
   
    <MainMenuPanel>
        <MainMenuHeader>
            <MainMenuHeading>
                {submenu.icon}
                {submenu.value.toUpperCase()} 
            </MainMenuHeading>

            <MainMenuDescription size='2'>
                {descriptions[parseInt(submenu.id)]}
            </MainMenuDescription>
        </MainMenuHeader>

        <MainMenuDivider />

        <MainMenuContent>     
            {submenu.content}
            <MainMenuDialog>
                dialllogg
            </MainMenuDialog>
        </MainMenuContent>
    </MainMenuPanel> 
)


const mainMenuPanels: ITabItem[] = mainMenuItems.map((menuItem) => {
    return {
        ...menuItem,
        content: <PanelWrapper submenu={menuItem} />,
    }
});

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

