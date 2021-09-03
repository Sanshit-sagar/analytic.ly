import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

import { atom, useAtom } from 'jotai'

inte
pages: Page[] = [
    { id: 'menu', name: 'Menu' }
]

const currentPageIndexAtom = atom<number>(0)
const currentPageIdAtom = ((get) => pages[get(currentPageIndexAtom)].id)


const Menu = () => {
    return  <TabulatedMenu />;
}   


Menu.getLayout = function getLayout(page: any) {
    return <DashboardLayout> {page} </DashboardLayout>;
}

export default Menu;