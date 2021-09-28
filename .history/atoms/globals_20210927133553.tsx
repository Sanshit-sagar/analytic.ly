

import { atom } from 'jotai'


export const activeMainMenuPanelAtom = atom('Destination')



export const isMountedAtom = atom(false)
export const activeRouteAtom: Atom<string> = atom('/dash')
export const quantityAtom: Atom<number>  = atom(2)
export const timeAgoAtom: Atom<number> = atom(5)
export const openTimeAgoAtom: Atom<boolean> = atom(false)
export const tickSizeAtom: Atom<number> = atom(3)
export const tickSizeActiveAtom: Atom<boolean> = atom(false)
