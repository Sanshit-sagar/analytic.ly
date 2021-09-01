import React from 'react'

import { AppContainer } from '../primitives/Shared'
import MenuLayout from '../layouts/MenuLayout'
import TabulatedMenu from '../components/SubMenus'
import { CentralDataVisualizer } from '../components/Shared'

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
            <MenuLayout> 
                {page} 
            </MenuLayout>
        </AppContainer>
    )
}


export default Menu;