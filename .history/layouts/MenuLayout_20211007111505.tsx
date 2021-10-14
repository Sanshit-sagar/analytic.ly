import { styled } from '../stitches.config'

import { Box } from '../primitives/Box'
import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import { Header } from '../components/Header'
import { SidePanel } from '../components/SidePanel'
import { Threshold } from '../components/Threshold'

// import Heatmap from '../components/Heatmap'

export interface IDashboardProps {
    children: any; 
}

export const MainComponent = styled('div', {
    height: '600px', 
    width: '1100px', 
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


const UserCollections = () => (
    <Box css={{ width: '600px', margin: '$1', mt: '$2' }}>
        <SidePanel />
    </Box>
)

const MenuLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <Header /> 

            <ScrollArea>
                <DashboardLayoutRow>
                    <MainComponent>
                        {children}
                    </MainComponent>
                    <UserCollections />
                </DashboardLayoutRow>

                <DashboardLayoutRow>
                        <PieChart />
                        <GroupedBars />
                    </DashboardLayoutRow>

            </ScrollArea>
        </AppContainer>
    )
}

export default MenuLayout