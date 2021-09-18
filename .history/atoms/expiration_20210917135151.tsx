import { atom } from 'jotai'

export const currentTime = new Date().getTime()
export const currentDate = new Date().getDate()
export const currentYear = new Date().getFullYear()
export const currentMonth = new Date().getMonth()
export const fromMonth = new Date(currentYear, currentMonth)
export const toMonth = new Date(currentYear + 1, currentMonth + 1)


export const fromMonthAtom = atom(new Date().getMonth())
export const fromYearAtom = atom(new Date().getFullYear())
export const setFromMonthAtom = atom(
    null,
    (_get, set, update: number) => set(fromMonthAtom, new Date(update).getMonth())
);
export const setFromYearAtom = atom(
   null,
    (_get, set, update: number) => set(fromYearAtom,  new Date(update).getFullYear())
)
export const fromDateAtom = atom(
    (get) => new Date(get(fromMonthAtom), get(fromYearAtom))
)

export const setFromDateAtom = atom(
    null,
    (_get, set, updatedDate: number) => {
        let updatedMonth = new Date(updatedDate).getMonth()
        let updatedYear = new Date(updatedDate).getFullYear()

        set(fromMonthAtom, updatedMonth) 
        set(fromYearAtom, updatedYear)
    }
)

export const activeMonthAtom = atom(fromMonth.getMonth())
export const activeYearAtom = atom(fromYear.get

export const hoveredStartDateAtom = atom(undefined)