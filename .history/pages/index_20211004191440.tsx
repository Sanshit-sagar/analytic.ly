import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { atom } from 'jotai' 
import { useUpdateAtom, atomWithStorage } from 'jotai/utils'
import { withUser, useUser, UserButton } from '@clerk/nextjs'

import { StreamGraph } from '../components/StreamGraph'

export const darkModeAtom = atomWithStorage('darkMode', true)
export const themeAtom = atomWithStorage('theme', 'theme4-dark')

export const timeAgoAtom = atom(5)
export const quantityAtom = atom(2)
export const tickSizeAtom = atom(3)
export const isMountedAtom = atom(false)
export const openTimeAgoAtom = atom(false)
export const tickSizeActiveAtom = atom(false)
export const activeRouteAtom = atom('/dash')

const UserProfile = () => {
    const { firstName } = useUser()

    return (
        <div className="container">
            <header>
                <UserButton />
            </header>
            <main> Hello, {firstName}! </main>
        </div>
    )
}

const Home = () => {
    const setIsMounted = useUpdateAtom(isMountedAtom)

    useEffect(() => {
        setIsMounted(true)
    })

    return (
        <Box 
        css={{ 
            height: '90vh', width: '100%', 
            margin: '$1', padding: '$1', 
            br: '$2', border: '1px solid $border', 
            '&:hover': { borderColor: '$border3', }
        }}>

        </Box>
    )
}
   
export default withUser(Home)