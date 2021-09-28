import React from 'react'
import { useAtom } from 'jotai'
import { useUser } from '@clerk/clerk-react'
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
})

type UserType = { name: string;  email: string }; 

function UserAuthFactory(user: any) {
    let userAuth: UserType = { 
        name: `${user?.firstName ?? ''}, ${user?.lastName ?? ''}`, 
        email: `${user?.primaryEmailAddress?.toString() ?? ''}` ?? '',
    };
    return userAuth
}

interface IUserAuth  {
    user: UserType | undefined;
    loading: boolean;
    error: Error | null;
};

const useUserAuth = () => {
    const { user, isSignedOut, isLoading } = useUser({
        withAssertions: true,
    });

    return {
        user: !isSignedOut(user) && !isLoading(user) ? UserAuthFactory(user) : undefined,
        loading: isLoading(user),
        error: isSignedOut(user)  || (!isSignedOut(user) && !isLoading(user) && !user)
    };
}


const TabulatedMenu = () => {
    const { user, loading, error } = useUserAuth()
    
    const [activePanel, setActivePanel] = useAtom(activeMainMenuPanelAtom)
    
    const handleTabChange = (updatedPanel: string) => setActivePanel(updatedPanel)

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> Error! </Text>
    
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
                hihihihi {user.email}
            </Text>
        </>
    )
}

export default TabulatedMenu

