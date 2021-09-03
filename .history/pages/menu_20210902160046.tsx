import React from 'react'
import { styled } from '../stitches.config'
import DashboardLayout from '../layouts/DashboardLayout'
import {
     AppContainer, 
     CentralDataVisualizer 
} from '../primitives/Shared'
import TabulatedMenu from '../components/SubMenus'

const Menu = () => {

    return  (
        <DashboardLayoutRow></DashboardLayoutRow>
        <CentralDataVisualizer> 
            <TabulatedMenu />
        </CentralDataVisualizer> 
    );
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