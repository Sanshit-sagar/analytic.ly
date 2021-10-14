import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { atom } from 'jotai' 
import { useUpdateAtom, atomWithStorage } from 'jotai/utils'
import { withUser } from '@clerk/nextjs'

import { Box } from '../primitives/Box'
import { Button } from '../primitives/Button'

// import { Swatch } from '../components/Swatch'
import { SteamGraph } from '../components/StreamGraph'

export const timeAgoAtom = atom(5)
export const quantityAtom = atom(2)
export const tickSizeAtom = atom(3)
export const isMountedAtom = atom(false)
export const openTimeAgoAtom = atom(false)
export const activeRouteAtom = atom('/dash')
export const tickSizeActiveAtom = atom(false)

export const darkModeAtom = atomWithStorage('darkMode', true)
export const themeAtom = atomWithStorage('theme', 'theme4-dark')


import MenuLayout from '../layouts/MenuLayout'
import TabulatedMenu from '../components/SubMenus'

const Menu = () => {
    
    <TabulatedMenu />;   
    

Menu.getLayout = function getLayout(page: any) {
    return (
        <MenuLayout>
            {page} 
        </MenuLayout>
    );
}

export default Menu


// const Home = () => {
//     const router = useRouter()
//     const setIsMounted = useUpdateAtom(isMountedAtom)

//     useEffect(() => {
//         setIsMounted(true)
//     })

//     return (
//         <Box 
//             css={{ 
//                 height: '97.5vh',
//                 width: '99.25%', 
//                 margin: '$1', 
//                 padding: '$1', 
//                 br: '$2', 
//                 border: '1px solid $border', 
//                 '&:hover': { 
//                     borderColor: '$border3', 
//                 }
//             }}
//         >
//             {/* <Swatch />  */}

//             <SteamGraph />
//             <Button onClick={() => router.push('/menu')}>
//                 Get Started 
//             </Button>
//         </Box>
//     )
// }
   
// export default withUser(Home)