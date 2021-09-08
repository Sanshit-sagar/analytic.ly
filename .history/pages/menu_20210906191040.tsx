import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

import { UtmParameters } from '../components/SubMenus/SeoParameters'

const Menu = () => {

    return (
        <TabulatedMenu />
    );
}   

Menu.getLayout = function getLayout(page: any) {
    return (
        <DashboardLayout sidebar={<}
            {page} 
        </DashboardLayout>;
}

export default Menu;