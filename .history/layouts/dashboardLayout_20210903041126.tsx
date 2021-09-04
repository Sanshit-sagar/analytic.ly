import { styled } from '../stitches.config'

import { Flex } from '../primitives/Flex'
import { Navigator, NavigatorGroupLeft, NavigatorGroupLeft } from '../primitives/AppBar'
import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import PieChart from '../components/Pie'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'

export interface IDashboardProps {
    children: any; 
}


export const MainComponent = styled('div', {
    backgroundColor: '$hiContrast', 
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

const Navigator = () => {

    return (
        <AppBar size='2'>
            <h1> hihi </h1>
            <h1> byebye </h1> 
        </AppBar>  
    )
}


const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <Navigator /> 

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

                <Flex 
                    css={{ 
                        height: '100%', width: '98%', display: 'flex', 
                        fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$1'
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