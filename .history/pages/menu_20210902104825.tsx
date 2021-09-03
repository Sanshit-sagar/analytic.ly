import React from 'react'
import { styled } from '../stitches.config'
import DashboardLayout from '../layouts/DashboardLayout'
import { AppContainer } from '../primitives/Shared'
import TabulatedMenu from '../components/SubMenus'



export const MenuContainer = styled('div', {
    backgroundColor: '$canvas', 
    height: '600px', 
    width: '1100px', 
    border: 'thin solid',
    borderColor: '$border3',
    maxWidth: '1100px', 
    br: '$2', 
    marginLeft: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
    
});

const Menu = () => {
    return (
        <MenuContainer>
            <TabulatedMenu />
        </MenuContainer>
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