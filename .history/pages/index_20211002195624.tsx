import React, { useEffect } from 'react'

import { atom } from 'jotai' 
import { useUpdateAtom, atomWithStorage } from 'jotai/utils'
import { withUser, useUser, UserButton } from '@clerk/nextjs'

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
    const router = useRouter()
    const setIsMounted = useUpdateAtom(isMountedAtom)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return <UserProfile />;
}
   
export default withUser(Home)


//     setTimeAgo(5)
//     setQuantity(2)
//     setTickSize(3)
//     setOpenTimeAgo(false)
//     setTickSizeActive(false)
//     setActiveRoute(`/dash`)