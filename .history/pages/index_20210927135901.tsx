import React, { useEffect } from 'react'

import { useUpdateAtom, atomWithStorage } from 'jotai/utils'
import { withUser, useUser, UserButton } from '@clerk/nextjs'

export const darkModeAtom = atomWithStorage('darkMode', true)
export const themeAtom = atomWithStorage('theme', 'theme4-dark')

export const isMountedAtom = atom(false)
export const activeRouteAtom: Atom<string> = atom('/dash')
export const quantityAtom: Atom<number>  = atom(2)
export const timeAgoAtom: Atom<number> = atom(5)
export const openTimeAgoAtom: Atom<boolean> = atom(false)
export const tickSizeAtom: Atom<number> = atom(3)
export const tickSizeActiveAtom: Atom<boolean> = atom(false)

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
