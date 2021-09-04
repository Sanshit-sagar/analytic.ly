import React from 'react'

import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { ActiveLink } from '../components/ActiveLink'
import { 
    Navigator, 
    NavigatorGroupLeft, 
    NavigatorGroupRight 
} from '../primitives/AppBar'

import DarkMode from '../DarkMode'

interface IPage {
    id: string;
    name: string;
    index: number;
    icon: any;
}

const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0, icon: <FilePlusIcon /> },
    { id: 'timeserier', name: 'Timeserier', index: 1, icon: <ClockIcon /> },
    { id: 'geomapper', name: 'Geomapper', index: 2, icon: <GlobeIcon /> },
    { id: 'tabulator', name: 'Tabulator', index: 3, icon: <TableIcon /> }
]


const NavigationRoutes = () => {

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center' }}>
            <ActiveLink children={<Text> menu </Text>} href={`/menu`} />
            <ActiveLink children={<Text> timeserier </Text>} href={`/dash`} />
            <ActiveLink children={<Text> geomapper </Text>} href={`/geo`} />
            <ActiveLink children={<Text> tabulator </Text>} href={`/table`} />
        </Flex>
    )
}

const AppBar = () => {

    return (
        <Navigator>
            <NavigatorGroupLeft>
                <NavigationRoutes /> 
            </NavigatorGroupLeft> 

            <NavigatorGroupRight>
                <DarkMode /> 
            </NavigatorGroupRight> 
        </Navigator>  
    )
}
