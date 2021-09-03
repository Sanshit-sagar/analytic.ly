import { Flex } from '../primitives/Flex'
import { ScrollArea } from '../primitives/ScrollArea'
import { 
    AppContainer,
    DashboardLayoutRow, 
    CentralDataVisualizer 
} from '../primitives/Shared'

import Header from '../components/Header'
import PieChart from '../components/Pie'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'

export interface IDashboardProps {
    children: any; 
}

const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <ScrollArea>
                {/* <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}> */}
                    <Header />

                    <DashboardLayoutRow>
                        <CentralDataVisualizer>
                            {children}
                        </CentralDataVisualizer>
                        <Statistics />
                    </DashboardLayoutRow>

                    <Flex 
                        css={{ 
                            height: '100%', width: '100%', display: 'flex', 
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