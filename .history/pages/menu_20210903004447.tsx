import React, { ReactNode } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import TabulatedMenu from '../components/SubMenus'

import { IconButton} from '../primitives/IconButton'
import { Tooltip } from '../primitives/Tooltip'
import { Icon } from '../primitives/Icon'

import { atom, useAtom } from 'jotai'

import { TableIcon, GlobeIcon, ClockIcon, FilePlusIcon } from '@radix-ui/react-icons'

interface IPage {
    id: string;
    name: string;
    index: number;
    icon: any;
}

const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0, icon: <FilePlusIcon /> },
    { id: 'timeserier', name: 'Timeserier', index: 1, icon: <ClockIcon /> },
    { id: 'geomapper', name: 'Geomapper', index: 2, icon: <GlobeIcon /> },
    { id: 'tabulator', name: 'Tabulator', index: 3, icon: <TableIcon /> }
]

const currentPageIndexAtom = atom<number>(0)
const currentPageIdAtom = atom<string>((get) => pages[get(currentPageIndexAtom)].id)


const Menu = () => {
    return  <TabulatedMenu />;
}   

const CurrentSelectionId = () => {
    const [currentPageId] = useAtom(currentPageIdAtom)

    return (
        <T
    )
}

const Navbar:React.FC = () => {
    const [_, setCurrentPageIndex] = useAtom(currentPageIndexAtom)

    return (
        <>
            {pages.map((page: IPage, idx: number) => {
                return (
                    <Tooltip content={page.name}> 
                        <IconButton 
                            key={idx}
                            size='2' 
                            variant='raised'
                            onClick={() => setCurrentPageIndex(idx)}
                        >
                            <Icon label={page.name}>
                                {page.icon}
                            </Icon>
                        </IconButton>
                    </Tooltip>
                )
            })}
        </>
    )
}


Menu.getLayout = function getLayout(page: any) {
    return <DashboardLayout> {page} </DashboardLayout>;
}

export default Menu;