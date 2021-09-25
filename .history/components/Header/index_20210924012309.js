import React from 'react'
import { useRouter } from 'next/router'

import { Swatch } from '../Swatch'
import { UserProfile } from '../User'
import { DarkMode } from '../DarkMode'
import { LocaleSelector } from '../Locales'
import { GlobalSearch } from '../GlobalSearch'

import { Text } from '../../primitives/Text'
import { Tooltip } from '../../primitives/Tooltip'
import { IconButton } from '../../primitives/IconButton'

import { 
    Head, 
    HeadGroupL, 
    HeadGroupR, 
    HeadDivider 
} from '../../primitives/AppBar'

import { 
    FilePlusIcon, 
    GlobeIcon, 
    ClockIcon, 
    TableIcon 
} from '@radix-ui/react-icons'

export interface IPage {
    id: string;
    name: string;
    index: number;
    route: string; 
    icon: any;
}

const pages: IPage[] = [
    { id: 'menu', name: 'Menu', index: 0, route: '/menu', icon: <FilePlusIcon /> },
    { id: 'timeseries', name: 'Timeseries', index: 1, route: '/dash', icon: <ClockIcon /> },
    { id: 'geomapper', name: 'Maps', index: 2, route: '/geo', icon: <GlobeIcon  /> },
    { id: 'tabulator', name: 'Table', index: 3, route: '/table', icon: <TableIcon /> }
]

const IconifiedRoute = ({ page }: { page: IPage }) => {
    const router = useRouter()
    const { name, icon, route } = page

    return (
        <Tooltip content={name}>
            <IconButton 
                key={`link-to-${route}`}
                size='2' 
                variant='ghost' 
                onClick={() => router.push(`${route}`)}
                css={{ 
                    bc: '$border', 
                    border: '2px solid $border', 
                    '&:hover': { 
                        bc: '$border2', 
                        borderColor: '$border3',
                    },
                    '&:focus': {
                        bc: '$border3',
                        borderColor: '$funkyText',
                    }
                }}
            >
                <Text css={{ color: '$funkyText'}}>
                    {icon}
                </Text>
            </IconButton>
        </Tooltip>
    )
}

const Routez = () =>  (
    <> 
        {pages.map((page: IPage, _: number) => (
            <IconifiedRoute page={page}  /> 
        ))} 
    </>
);

const Header = () => (
    <Head>
        <HeadGroupL>
            <Routez /> 
            <HeadDivider />
            <GlobalSearch />
        </HeadGroupL> 

        <HeadGroupR>
            <LocaleSelector /> 
            <Swatch />
            <DarkMode /> 
            <HeadDivider />
            <UserProfile /> 
        </HeadGroupR> 
    </Head>  
);

export default Header
