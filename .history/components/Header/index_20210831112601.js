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
    TableIcon
} from '@radix-ui/react-icons'

import DarkMode from '../DarkMode'
import ThemeSelector, { ThemeSelections } from '../ThemeSelector'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from '../../primitives/Dialog'
import { Button } from '../../primitives/Button'
import { Text } from '../../primitives/Text'

const CustomDialog = () => {

    return (
        <Dialog>
            <DialogTrigger as={Button}>
                Dialog</DialogTrigger>

            <DialogContent>
                <Text size="5" as="h6" css={{ fontWeight: 500, mb: '$3' }}>
                  Dialog Heading
                </Text>
                <Text size="3" as="p" css={{ lineHeight: '25px' }}>
                   There are 5 variants to choose from. Use is for positive states.
                </Text>
            </DialogContent>

            <Popover>
                <PopoverTrigger as={Button}>
                    Open
                </PopoverTrigger>
                
                <PopoverContent>
                    <PopoverClose 
                        as={Button} 
                        ghost
                    >
                        Close
                    </PopoverClose>
                </PopoverContent>
            </Popover>
        </Dialog>
    );
}

const NavButtons = () => {
    const router = useRouter()

    const navOptions = [
        { id: 0, name: 'Timeseries', route: '/dash', icon: <BarChartIcon /> },
        { id: 1, name: 'GeoMap', route: '/geo', icon: <GlobeIcon /> },
        { id: 2, name: 'Table', route: '/table', icon: <TableIcon /> }
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
            <CustomDialog />
            <NavButtons /> 
        </HeaderContainer>
    );
}

export default Header