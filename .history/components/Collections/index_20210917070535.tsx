import React from 'react' 
import { ITabItem, HorizontalTabs } from '../../compositions/Tabs'

import { UtmParameters } from '../SubMenus/SeoParameters/utmParameters'
import { atom, useAtom } from 'jotai'

import { ArchiveIcon, }

const activeCollectionsTabStrAtom = atom('urchins')

const tabItems: ITabItem[] = [
    { id: '0', value: 'urchins', name: 'Urchins', content: <UtmParameters />, icon: <ArchiveIcon />},
    { id: '1', value: 'templates', name: 'Templates', content: undefined, icon: <ArchiveIcon /> }
];

export const SidePanel = () => {
    const [activePanel, setActivePanel] = useAtom(activeCollectionsTabStrAtom)

    const handleTabChange = (updatedTab: string) => setActivePanel(updatedTab);

    return (
        <HorizontalTabs 
            orientation='horizontal' 
            direction='ltr'
            items={tabItems} 
            value={activePanel}
            onChange={handleTabChange} 
        />
    );
}