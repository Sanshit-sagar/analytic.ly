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
    route: string; 
    icon: any;
}

export const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0, route: '/menu', icon: <FilePlusIcon /> },
    { id: 'timeserier', name: 'Timeserier', index: 1, route: '/dash', icon: <ClockIcon /> },
    { id: 'geomapper', name: 'Geomapper', index: 2, route: '/geo', icon: <GlobeIcon /> },
    { id: 'tabulator', name: 'Tabulator', index: 3, route: '/table', icon: <TableIcon /> }
]


const Routez = () => {

    return (
        <>
            {pages.map((page: IPage, _: number) => {
                return (
                    <ActiveLink 
                        key={`link-to-${page.id}`} 
                        href={page.route} 
                        children={
                            <>
                            <
                            <Text 
                                size='1' 
                                css={{ color: '$text', }} 
                            > 
                                {page.name} 
                            </Text> 
                        }
                    />
                )
            })}
        </>
    )
}

const Plafond = () => {

    return (
        <Head>
            <HeadGroupL>
                <Routez /> 
                <HeadDivider />
            </HeadGroupL> 

            <HeadGroupR>
                <HeadDivider /> 
                <DarkMode /> 
            </HeadGroupR> 
        </Head>  
    )
}

export default Plafond
