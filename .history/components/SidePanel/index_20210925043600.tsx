import React from 'react' 
import { atom, useAtom } from 'jotai'

import { ITabItem, TabsContainer } from '../../compositions/Tabs'

// import { UtmParameters } from '../SubMenus/SeoParameters/utmParameters'

import { InputSummaryPanel } from './InputSummary'
import { OpenGraphResults } from './OpenGraph'
import { SeoResults } from './'
import { 
    ArchiveIcon, 
    ClipboardIcon 
} from '@radix-ui/react-icons'

const activeCollectionsTabStrAtom = atom('clipboard')

const tabItems: ITabItem[] = [
    { id: '0', value: 'clipboard', name: 'Clipboard', content: <InputSummaryPanel />, icon: <ClipboardIcon /> },
    { id: '1', value: 'templates', name: 'Templates', content: <OpenGraphResults />, icon: <ArchiveIcon /> },
     { id: '2', value: 'urchins', name: 'Urchins', content: <SeoResults />, icon: <HomeIcon /> },
];

export const SidePanel = () => {
    const [activePanel, setActivePanel] = useAtom(activeCollectionsTabStrAtom)

    const handleTabChange = (updatedTab: string) => setActivePanel(updatedTab);

    return (
        <TabsContainer 
            size='small'
            orientation='horizontal' 
            direction='ltr'
            items={tabItems} 
            value={activePanel}
            onChange={handleTabChange} 
        />
    );
}