import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { ActiveLink } from '../../components/ActiveLink'

import { 
    Head, 
    HeadGroupL, 
    HeadGroupR, 
    HeadDivider 
} from '../../primitives/AppBar'
import {
    FilePlusIcon,
    ClockIcon,
    GlobeIcon,
    TableIcon
} from '@radix-ui/react-icons'

import DarkMode from '../DarkMode'

export interface IPage {
    id: string;
    name: string;
    index: number;
    icon: any;
}

export const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0, icon: <FilePlusIcon /> },
    { id: 'timeserier', name: 'Timeserier', index: 1, icon: <ClockIcon /> },
    { id: 'geomapper', name: 'Geomapper', index: 2, icon: <GlobeIcon /> },
    { id: 'tabulator', name: 'Tabulator', index: 3, icon: <TableIcon /> }
]


const Routez = () => {

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center' }}>
            {pages.map((page: IPage, i: number) => {
                return (
                    <ActiveLink key={`link-to-/$`} href={page.route} 
                )
            })}
            <ActiveLink children={<Text> menu </Text>} href={`/menu`} />
            <ActiveLink children={<Text> timeserier </Text>} href={`/dash`} />
            <ActiveLink children={<Text> geomapper </Text>} href={`/geo`} />
            <ActiveLink children={<Text> tabulator </Text>} href={`/table`} />
        </Flex>
    )
}

const Plafond = () => {

    return (
        <Head>
            <HeadGroupL>
                <Routez /> 
            </HeadGroupL> 

            <HeadGroupR>
                <DarkMode /> 
            </HeadGroupR> 
        </Head>  
    )
}

export default Plafond
