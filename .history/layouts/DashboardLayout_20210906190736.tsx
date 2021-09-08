import { styled } from '../stitches.config'

import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import PieChart from '../components/Pie'
import Plafond from '../components/Plafond'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'


export interface IDashboardProps {
    children: any; 
}

export const MainComponent = styled('div', {
    bc: '$neutral', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px', 
    ml: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
});

export const DashboardLayoutRow = styled('div', {
    height: '100%', 
    width: '100%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start'
});

export const DashboardLayoutGraphRow = styled('div', {
    height: '475px',
    width: '100%',
    display: 'flex',
    fd: 'row',
    jc: 'space-between', 
    ai: 'flex-start',
    gap: '$2'
});

const DashboardLayout = ({ children, sidebar }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <Plafond /> 

            <ScrollArea>
                <DashboardLayoutRow>
                    <MainComponent>
                        {children}
                    </MainComponent>
                    <Statistics />
                </DashboardLayoutRow>

                <DashboardLayoutRow>
                    <PieChart />
                    <GroupedBars />
                </DashboardLayoutRow>

            </ScrollArea>
        </AppContainer>
    )
}

export default DashboardLayout