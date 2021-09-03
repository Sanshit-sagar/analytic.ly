import React from 'react'
import { styled } from '../stitches.config'
import DashboardLayout from '../layouts/DashboardLayout'
import {
     AppContainer, 
     CentralDataVisualizer,
     DashboardLayoutRow
} from '../primitives/Shared'
import Statistics from '../components/Statistics'
import TabulatedMenu from '../components/SubMenus'

const Menu = () => {

    return  (
       
            <CentralDataVisualizer> 
                <TabulatedMenu />
            </CentralDataVisualizer> 

            <Statistics />
        </DashboardLayoutRow>
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