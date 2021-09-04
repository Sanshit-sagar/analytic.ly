import React from 'react'
import { styled } from '../../stitches.config'

import { Icon } from '../../primitives/Icon'
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

const IconifiedRouteContainer = styled('div', {
    display: 'flex',
    d: 'row', jc: 'flex-start', ai: 'center', gap: '$1', '&:hover': { backgroundColor: 'red' }}
})

export const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0, route: '/menu', icon: <FilePlusIcon /> },
    { id: 'timeserier', name: 'Timeserier', index: 1, route: '/dash', icon: <ClockIcon /> },
    { id: 'geomapper', name: 'Geomapper', index: 2, route: '/geo', icon: <GlobeIcon /> },
    { id: 'tabulator', name: 'Tabulator', index: 3, route: '/table', icon: <TableIcon /> }
]

const IconifiedRoute = ({ page }: { page: IPage }) => {
    const { id, name, icon } = page

    return (
        <Flex key={id}>
            <Text 
                size='1' 
                css={{ color: '$text', textDecoration: 'none' }} 
            > 
                {name} 
            </Text> 
            <Icon label={`icon-for-page-${page.id}`}>
                {icon}
            </Icon>
        </Flex>
    )
}


const Routez = () => {

    return (
        <>
            {pages.map((page: IPage, _: number) => {
                return (
                    <ActiveLink 
                        key={`link-to-${page.id}`} 
                        href={page.route} 
                        children={
                            <IconifiedRoute page={page} />
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
