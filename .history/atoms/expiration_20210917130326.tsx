import { SetStateAction } from 'react'
import { atom } from 'jotai'

export const currentTimeAtom = atom(new Date().getTime())
export const currentDateAtom = atom(new Date().getDate())
export const currentYearAtom = atom(new Date().getFullYear())
export const currentMonthAtom = atom(new Date().getMonth())
export const fromMonth = atom((get) => new Date(get(currentYearAtom), get(currentMonthAtom))
export const toMonth = atom((get) => new Date(get(currentYear) + 1, get(currentMonth + 1)

export const monthAtom = atom(currentMonth)
export const yearAtom = atom(currentYear)
export const dateAtom = atom(
    (get) => new Date(get(yearAtom), get(monthAtom))
);
export const monthAtomsAtom = atom(
    (get) => get(dateAtom).getMonth(),
    (_get, set, update: SetStateAction<number>) => set(monthAtom, update)
);
export const yearAtomsAtom = atom(
    (get) => get(dateAtom).getFullYear(),
    (_get, set, update: SetStateAction<number>) => set(yearAtom, update)
)