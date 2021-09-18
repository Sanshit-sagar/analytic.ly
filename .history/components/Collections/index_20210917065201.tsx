import React from 'react' 
import { ITabItem, HorizontalTabs } from '../../compositions/Tabs'

import { UtmParameters } from '../SubMenus/SeoParameters/utmParameters'
import { atom, useAtom } from 'jotai'

const activeCollectionsTabStrAtom = atom('urchins')

const tabItems: ITabItem[] = [
    { id: '0', value: 'urchins', name: 'Urchins', content: <UtmParameters />},
    { id: '1', value: 'templates', name: 'Templates', content: undefined }
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