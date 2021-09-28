import React, { useEffect } from 'react'

import { atom } from 'jotai' 
import { useUpdateAtom, atomWithStorage } from 'jotai/utils'
import { withUser, useUser, UserButton } from '@clerk/nextjs'

export const darkModeAtom = atomWithStorage('darkMode', true)
export const themeAtom = atomWithStorage('theme', 'theme4-dark')

export const isMountedAtom = atom(false)
export const activeRouteAtom = atom('/dash')
export const timeAgoAtom = atom(5)
export const quantityAtom = atom(2)
export const tickSizeAtom = atom(3)
export const openTimeAgoAtom = atom(false)
export const tickSizeActiveAtom = atom(false)

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
    const setTimeAgo = useUpdateAtom(timeAgoAtom)
    const setQuantity = useUpdateAtom(quantityAtom)
    const setTickSize = useUpdateAtom(tickSizeAtom)
    const setIsMounted = useUpdateAtom(isMountedAtom)
    const setOpenTimeAgo = useUpdateAtom(openTimeAgoAtom)
    const setActiveRoute = useUpdateAtom(activeRouteAtom)
    const setTickSizeActive = useUpdateAtom(tickSizeActiveAtom)

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
