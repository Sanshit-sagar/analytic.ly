import { SetStateAction } from 'react'
import { atom } from 'jotai'

export const currentTime = new Date().getTime()
export const currentDate = new Date().getDate()
export const currentYear = new Date().getFullYear()
export const currentMonth = new Date().getMonth()
export const fromMonth = new Date(currentYear, currentMonth)
export const toMonth = new Date(currentYear + 1, currentMonth + 1)

export const fromMonthAtom = atom(new Date().getTime())
export const fromYearAtom = atom(new Date().getFullYear())
export const setFromMonthAtom = atom(
    null,
    (_get, set, update: SetStateAction<number>) => set(fromMonthAtom, update)
);
export const setFromYearAtom = atom(
   null,
    (_get, set, update: SetStateAction<number>) => set(fromYearAtom, update)
)
export const fromDateAtom = atom(
    (get) => new Date(get(fromMonthAtom), get(fromYearAtom))
);

export const setFromDateAtom = atom(
    null,
    (get, set, updatedDate: number)
)

export const hoveredStartDateAtom = atom(undefined)