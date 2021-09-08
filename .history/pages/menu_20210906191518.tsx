import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

import { UtmParameters } from '../components/SubMenus/SeoParameters/utmParameters'

const Menu = () => {

    return (
        <TabulatedMenu />
    );
}   

Menu.getLayout = function getLayout(page: any) {
    return (
        <MenuLayout sidebar={<UtmParameters />}>
            {page} 
        </DashboardLayout>
    );
}

export default Menu;