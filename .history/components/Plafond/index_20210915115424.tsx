import React from 'react'
import { styled } from '../../stitches.config'

import Swatch from '../Swatch'
import DarkMode from '../DarkMode'

import { ActiveLink } from '../ActiveLink'
import { Icon } from '../../primitives/Icon'
import { Tooltip } from '../../primitives/Tooltip'
import { IconButton } from '../../primitives/IconButton'
import { SearchField } from '../../compositions/SearchField'

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
];

const IconRouteButton = ({ children }: {children: any}) => (
    <IconButton 
        size='2'
        variant='ghost'
    > 
        {children} 
    </IconButton>
);

const IconifiedRouteContainer = styled(IconRouteButton, {
    display: 'flex',
    fd: 'row',
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1', 
    '&:hover': { 
        backgroundColor: '$accent' 
    }
});

const IconifiedRoute = ({ page }: { page: IPage }) => {
    const { id, icon } = page

    return (
        <Tooltip content={'hihihi'}>
            <IconifiedRouteContainer key={id}>
                <Icon label={`icon-for-page-${page.id}`}>
                    {icon}
                </Icon>
            </IconifiedRouteContainer>
        </Tooltip>
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
                            <IconifiedRoute 
                                page={page} 
                            />
                        }
                    />
                )
            })}
        </>
    )
}


const GlobalSearch = () => {
    
    return (
        <SearchField
            label='Search'
            placeholder='What are you looking for?'
            onSubmit={(query) => alert(`User Searched: ${query}`)}
        />
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
                <GlobalSearch />
                <Swatch />
                <HeadDivider /> 
                <DarkMode /> 
            </HeadGroupR> 
        </Head>  
    )
}

export default Plafond
