import { styled } from '../stitches.config'

import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import Plafond from '../components/Plafond'
import { Collections } from '../components/Collections'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'

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


const UserCollections = () => {

    return (
        <Box css={{ width: '300px', margin: '$1', mt: '$2' }}>
            <Collections />
        </Box>
    )
}

const MenuLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <Plafond /> 

            <ScrollArea>
                <DashboardLayoutRow>
                    <MainComponent>
                        {children}
                    </MainComponent>
                    <UserCollections />
                </DashboardLayoutRow>

                {/* <DashboardLayoutRow> */}
                    {/* <PieChart /> */}
                    {/* <GroupedBars /> */}
                {/* </DashboardLayoutRow> */}

            </ScrollArea>
        </AppContainer>
    )
}

export default MenuLayout