import React, { useEffect } from 'react'

import { useUpdateAtom, atomWithStorage } from 'jotai/utils'
import { withUser, useUser, UserButton } from '@clerk/nextjs'

import {
    isMountedAtom,
    activeRouteAtom, 
    timeAgoAtom,
    tickSizeAtom,
    quantityAtom,
    tickSizeActiveAtom, 
    openTimeAgoAtom
} from '../atoms/globals'

export const darkModeAtom = atomWithStorage('darkMode', true)
export const themeAtom = atomWithStorage('theme', 'theme4-dark')

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
    const setTimeAgo = useUpdateAtom(timeAgoAtom)
    const setQuantity = useUpdateAtom(quantityAtom)
    const setTickSize = useUpdateAtom(tickSizeAtom)
    const setOpenTimeAgo = useUpdateAtom(openTimeAgoAtom)
    const setTickSizeActive = useUpdateAtom(tickSizeActiveAtom)
    const setActiveRoute = useUpdateAtom(activeRouteAtom)

    useEffect(() => {
        setIsMounted(true)
        setTimeAgo(5)
        setQuantity(2)
        setTickSize(3)
        setOpenTimeAgo(false)
        setTickSizeActive(false)
        setActiveRoute(`/dash`)
    }, [])

    return <UserProfile />;
}
   
export default withUser(Home)
