import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

import { AppContainer } from '../../primitives/Shared'
import { ScrollArea } from '../../primitives/ScrollArea'

import PieChart from '../../components/Pie'
import GroupedBars from '../../components/Bars'
import Statistics from '../../components/Statistics'

import Plafond from '../../components/Plafond'

export interface IDashboardProps {
    children: any; 
}

export const MainComponent = styled('div', {
    bc: '$neutral', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px', 
    border: 'thin solid',
    borderColor: '$border3', 
    br: '$2', 
    ml: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
});

export const DashboardLayoutRow = styled('div', {
    height: '100%', 
    width: '98%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
});

const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <Plafond /> 

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

                <DashboardLayoutRow>
                    <PieChart />
                    <GroupedBars />
                </DashboardLayoutRow>

            </ScrollArea>
        </AppContainer>
    )
}

export default DashboardLayout