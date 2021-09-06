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
        <DashboardLayout> {page} </DashboardLayout>
    )
}

export default Menu;