import React from 'react'

import { 
    AppContainer, 
    CentralDataVisualizer 
} from '../primitives/Shared'
import DashboardLayout from '../layouts/MenuLayout'
import TabulatedMenu from '../components/SubMenus'

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