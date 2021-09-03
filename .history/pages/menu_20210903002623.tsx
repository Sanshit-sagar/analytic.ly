import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

import { atom, useAtom } from 'jotai'


const currentPageIndexAtom = atom<number>(0)
const currentPage


const Menu = () => {
    return  <TabulatedMenu />;
}   


Menu.getLayout = function getLayout(page: any) {
    return <DashboardLayout> {page} </DashboardLayout>;
}

export default Menu;