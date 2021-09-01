import React from 'react'
import Head from 'next/head'

import { Atom, atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const darkModeAtom = atomWithStorage('darkMode', false)

export const quantityAtom: Atom<number>  = atom(2)
export const timeAgoAtom: Atom<number> = atom(5)
export const openTimeAgoAtom: Atom<boolean> = atom(false)
export const tickSizeAtom: Atom<number> = atom(3)
export const tickSizeActive: Atom<boolean> = atom(false)

const Home = () => {
    const [darkMode] = useAtom(darkModeAtom)

    return (
        <>
            <Head>
                <title> analytic.ly </title>
            </Head> 

            <main>
                <p>Hello analyticly </p> 
            </main>
        </>
    );
}
   
export default Home;

