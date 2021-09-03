import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import {
     AppContainer, 
} from '../primitives/Shared'
import TabulatedMenu from '../components/SubMenus'

const Menu = () => {

    return  (
        <TabulatedMenu />
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