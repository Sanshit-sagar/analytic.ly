import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { atom } from 'jotai' 
import { useUpdateAtom, atomWithStorage } from 'jotai/utils'
import { withUser, useUser } from '@clerk/nextjs'

import { Box } from '../primitives/Box'
import { SteamGraph } from '../components/StreamGraph'
import { Greeting } from '../components/User'

export const timeAgoAtom = atom(5)
export const quantityAtom = atom(2)
export const tickSizeAtom = atom(3)
export const isMountedAtom = atom(false)
export const openTimeAgoAtom = atom(false)
export const activeRouteAtom = atom('/dash')
export const tickSizeActiveAtom = atom(false)

export const darkModeAtom = atomWithStorage('darkMode', true)
export const themeAtom = atomWithStorage('theme', 'theme4-dark')


const Home = () => {
    const setIsMounted = useUpdateAtom(isMountedAtom)

    useEffect(() => {
        setIsMounted(true)
    })

    return (
        <Box 
            css={{ 
                height: '97.5vh',
                width: '99.25%', 
                margin: '$1', 
                padding: '$1', 
                br: '$2', 
                border: '1px solid $border', 
                '&:hover': { 
                    borderColor: '$border3', 
                }
            }}
        >
            <SteamGraph />
        </Box>
    )
}
   
export default withUser(Home)