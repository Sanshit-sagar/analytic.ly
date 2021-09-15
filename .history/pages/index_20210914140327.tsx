import React, { useEffect} from 'react'

import { Atom, atom } from 'jotai'
import { atomWithStorage, useUpdateAtom } from 'jotai/utils'
import { Datum } from '../components/Timeseries/interfaces'

const currentDate = new Date()
const initData: Datum[] = [{
    index: 0,
    timestamp: currentDate.getTime(),
    clickscore: 0,
    clickfmttime: currentDate.toLocaleString(),
    clickdate: currentDate, 
}];

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
export const amountAtom = atom(10)
export const rangeIndexAtom = atom(8)
export const intervalIndexAtom = atom(3)
export const filteredDataAtom = atom(initData) 
export const boundsAtom = atom({
    x0: new Date().getTime(),
    y0: 0,
    x1: new Date().getTime(), 
    y1: 10
});
export const lastUpdatedAtAtom = atom(new Date().getTime())

const Home = () => {
    const setIsMounted = useUpdateAtom(isMountedAtom)

    useEffect(() => setIsMounted(true), [])

    return <h1> Welcome to analytic.ly </h1>;
}
   
export default Home;


<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
  <defs>
    <style>
      .a {
        fill: #6e6e6e;
      }
    </style>
  </defs>
  <title>S BookmarkSmallOutline 18 N</title>
  <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path class="a" d="M11,4v8.957l-1.79-1.75-.7-.682-.7.68L6,12.972V4Zm.5-1h-6a.5.5,0,0,0-.5.5V14.753a.2615.2615,0,0,0,.153.228.21049.21049,0,0,0,.1.022.25554.25554,0,0,0,.176-.074l3.087-3.005,3.061,2.994a.25.25,0,0,0,.176.072.236.236,0,0,0,.1-.019A.25.25,0,0,0,12,14.744V3.5A.5.5,0,0,0,11.5,3Z" />
</svg>
