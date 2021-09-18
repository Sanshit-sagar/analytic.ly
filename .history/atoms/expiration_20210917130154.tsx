import { SetStateAction } from 'react'
import { atom } from 'jotai'

export const currentTimeAtom = new Date().getTime()
export const currentDateAtom = new Date().getDate()
export const currentYearAtom = new Date().getFullYear()
export const currentMonthAto = new Date().getMonth()
export const fromMonth = new Date(currentYear, currentMonth)
export const toMonth = new Date(currentYear + 1, currentMonth + 1)

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