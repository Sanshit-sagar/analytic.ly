import React from 'react'
import { styled } from '../stitches.config'
import DashboardLayout from '../layouts/DashboardLayout'
import { AppContainer } from '../primitives/Shared'
import TabulatedMenu from '../components/SubMenus'

const Menu = () => {
    return  <TabulatedMenu />;
}   


Menu.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <DashboardLayout> 
                    {page} 
                </MenuContainer>
            </DashboardLayout>
        </AppContainer>
    )
}


export default Menu;