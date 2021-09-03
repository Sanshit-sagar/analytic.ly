import React from 'react'
import { styled } from '../stitches.config'
import DashboardLayout from '../layouts/DashboardLayout'
import { AppContainer } from '../primitives/Shared'
import TabulatedMenu from '../components/SubMenus'



export const MenuContainer = styled('div', {
    backgroundColor: '$hiContrast', 
    height: '600px', 
    width: '1000px', 
    border: '2px solid',
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
        <AppContainer>
            <DashboardLayout> 
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}


export default Menu;