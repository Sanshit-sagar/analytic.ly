import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

import { atom, useAtom } from 'jotai'

interface IPage {
    id: string;
    name: string;
    index: number;
}

const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0 },
    { id: 'timeserier', name: 'Timeserier', index: 1 },
    { id: 'geomapper', name: 'Geomapper', index: 2 },
    { id: 'tabulator', name: 'Tabulator', index: 3 }
]

const currentPageIndexAtom = atom<number>(0)
const currentPageIdAtom = atom<((get) => pages[get(currentPageIndexAtom)].id)


const Menu = () => {
    return  <TabulatedMenu />;
}   


Menu.getLayout = function getLayout(page: any) {
    return <DashboardLayout> {page} </DashboardLayout>;
}

export default Menu;