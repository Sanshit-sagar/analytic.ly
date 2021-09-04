import { styled } from '../stitches.config'

import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { ActiveLink } from '../components/ActiveLink'
import { 
    Navigator, 
    NavigatorGroupLeft, 
    NavigatorGroupRight 
} from '../primitives/AppBar'

import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import PieChart from '../components/Pie'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'

import DarkMode from '../components/DarkMode'

export interface IDashboardProps {
    children: any; 
}

export const MainComponent = styled('div', {
    backgroundColor: '$neutral', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px', 
    border: 'thin solid',
    borderColor: '$border3', 
    borderRadius: '$2', 
    marginLeft: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
});

export const DashboardLayout

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


const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <AppBar /> 

            <ScrollArea>
                <Flex 
                    css={{ 
                        height: '100%', width: '100%', display: 'flex',
                        fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1'
                    }}        
                >              
                    <MainComponent>
                        {children}
                    </MainComponent>
                    <Statistics />
                </Flex>

                <Flex css={{ 
                    
                    
                    }}
                >
                    <PieChart />
                    <GroupedBars />
            
                </Flex>
            </ScrollArea>
        </AppContainer>
    )
}

export default DashboardLayout