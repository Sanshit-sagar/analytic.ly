import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

import { atom, useAtom } from 'jotai'

pages = [
    { id: 'menu', route: ''}
]

const currentPageIndexAtom = atom<number>(0)
const currentPageStrAtom = ((get) => page[get(currentPageIndexAtom)].name)


const Menu = () => {
    return  <TabulatedMenu />;
}   


Menu.getLayout = function getLayout(page: any) {
    return <DashboardLayout> {page} </DashboardLayout>;
}

export default Menu;