import React from 'react'
import s
import { 
    AppContainer, 
    CentralDataVisualizer 
} from '../primitives/Shared'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'



export const CentralDataVisualizer = styled('div', {
    backgroundColor: '$panel', 
    height: '600px', 
    width: '1100px', 
    border: 'thin solid',
    maxWidth: '1100px',
    borderColor: '$border2', 
    br: '$2', 
    marginLeft: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
    
});

const Menu = () => {
    return (
        <CentralDataVisualizer>
            <TabulatedMenu />
        </CentralDataVisualizer>
    )
}   


Menu.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <DashboardLayout> 
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}


export default Menu;