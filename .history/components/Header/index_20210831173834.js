import React, { useRef } from 'react' 
import { useRouter } from 'next/router'

import { 
    HeaderContainer, 
    NavButton 
} from '../../primitives/Shared'

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

const NavButtons = () => {
    const router = useRouter()

    const navOptions = [
        { id: 0, name: 'Timeseries', route: '/dash', icon: <BarChartIcon /> },
        { id: 1, name: 'GeoMap', route: '/geo', icon: <GlobeIcon /> },
        { id: 2, name: 'Table', route: '/table', icon: <TableIcon /> },
        { id}
    ];

    const handleNavigation = (updatedRoute) => router.push(updatedRoute); 

    return (
        <>
            {navOptions.map((navOption, i) => {
                return (
                    <NavButton 
                        key={i}
                        onClick={() => handleNavigation(`${navOption.route}`)}
                    >
                        {navOption.icon}
                    </NavButton>
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