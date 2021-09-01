import React, { useRef } from 'react' 
import { useRouter } from 'next/router'

import { 
    HeaderContainer, 
    NavButton 
} from '../../primitives/Shared'

import { Icon } from '../../primitives/Icon'
import { IconButton } from '../../primitives/IconButton'
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
    const setActiveRoute = 

    const navOptions = [
        { id: 0, name: 'Menu', route: '/menu', icon: <FilePlusIcon />},
        { id: 1, name: 'Timeseries', route: '/dash', icon: <BarChartIcon /> },
        { id: 2, name: 'GeoMap', route: '/geo', icon: <GlobeIcon /> },
        { id: 3, name: 'Table', route: '/table', icon: <TableIcon /> },
    ];

    const handleNavigation = (updatedRoute) => {
        
        router.push(updatedRoute)
    }

    return (
        <>
            {navOptions.map((navOption, i) => {
                return (
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