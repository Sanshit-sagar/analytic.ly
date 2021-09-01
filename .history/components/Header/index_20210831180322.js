import React, { useRef } from 'react' 
import { useRouter } from 'next/router'

import { Icon } from '../../primitives/Icon'
import { Tooltip } from '../../primitives/Tooltip'
import { IconButton } from '../../primitives/IconButton'
import { HeaderContainer } from '../../primitives/Shared'

import { 
    SunIcon, 
    MoonIcon, 
    GlobeIcon, 
    BarChartIcon,
    TableIcon,
    FilePlusIcon
} from '@radix-ui/react-icons'

import DarkMode from '../DarkMode'
import ThemeSelector, { ThemeSelections } from '../ThemeSelector'

import { useUpdateAtom } from 'jotai/utils'
import { activeRouteAtom } from '../../pages/index'

const NavButtons = () => {
    const router = useRouter()
    const setActiveRoute = useUpdateAtom(activeRouteAtom) 

    const navOptions = [
        { id: 0, name: 'Menu', route: '/menu', icon: <FilePlusIcon />},
        { id: 1, name: 'Timeseries', route: '/dash', icon: <BarChartIcon /> },
        { id: 2, name: 'GeoMap', route: '/geo', icon: <GlobeIcon /> },
        { id: 3, name: 'Table', route: '/table', icon: <TableIcon /> },
    ];

    const handleNavigation = (updatedRoute) => {
        setActiveRoute(updatedRoute); 
        router.push(updatedRoute)
    }

    return (
        <>
            {navOptions.map((navOption, i) => {
                return (
                    <Tooltip content={`${navOption.name}`}> 
                        <IconButton 
                            key={i}
                            size='2' 
                            variant='raised'
                            onClick={() => handleNavigation(`${navOption.route}`)}
                        >
                            <Icon label={`/${navOption.name}`}>
                                {navOption.icon}
                            </Icon>
                        </IconButton>
                    </Tooltip>
                );
            })}
        </>
    )
}

const Header = () => {


    return (
        <HeaderContainer>
            <DarkMode />
            <ThemeSelector />
            <NavButtons /> 
        </HeaderContainer>
    );
}

export default Header