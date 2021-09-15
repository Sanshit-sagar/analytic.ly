import React, { useEffect} from 'react'

import { Atom, atom } from 'jotai'
import { atomWithStorage, useUpdateAtom } from 'jotai/utils'

export const darkModeAtom = atomWithStorage('darkMode', true)
export const themeAtom = atomWithStorage('theme', 'theme4-dark')
export const isMountedAtom = atom<boolean>(false)

export const activeRouteAtom: Atom<string> = atom('/dash')

export const quantityAtom: Atom<number>  = atom(2)
export const timeAgoAtom: Atom<number> = atom(5)
export const openTimeAgoAtom: Atom<boolean> = atom(false)
export const tickSizeAtom: Atom<number> = atom(3)
export const tickSizeActive: Atom<boolean> = atom(false)

// default graph shows 2 weeks divided into hour long intervals
export const amountAtom = atom(1)
export const rangeIndexAtom = atom(8)
export const intervalIndexAtom = atom(3)

const Home = () => {
    const setIsMounted = useUpdateAtom(isMountedAtom)

    useEffect(() => setIsMounted(true), [])

    return <h1> Welcome to analytic.ly </h1>;
}
   
export default Home;

