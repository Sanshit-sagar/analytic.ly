import { Flex } from '../primitives/Flex'
import { ScrollArea } from '../primitives/ScrollArea'
import { AppBar } from '../primitives/AppBar'

import { 
    AppContainer,
    CentralDataVisualizer 
} from '../primitives/Shared'

import PieChart from '../components/Pie'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'

export interface IDashboardProps {
    children: any; 
}

const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <AppBar /> 
            <ScrollArea>
                <Flex 
                    css={{ 
                        height: '100%', width: '1400px', display: 'flex',
                        fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1'
                    }}        
                >              
                    <CentralDataVisualizer>
                        {children}
                    </CentralDataVisualizer>
                    <Statistics />
                </Flex>

                <Flex 
                    css={{ 
                        height: '100%', width: '1350px', display: 'flex', 
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