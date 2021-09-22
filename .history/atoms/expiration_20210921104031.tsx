import { Atom, atom } from 'jotai'
import { useFormattedDate } from '../hooks/useDates'

export const currentTime = new Date().getTime()
export const currentDate = new Date().getDate()
export const currentYear = new Date().getFullYear()
export const currentMonth = new Date().getMonth()
export const fromMonth = new Date(currentYear, currentMonth)
export const toMonth = new Date(currentYear + 1, currentMonth + 1)

export const activePageAtom = atom<Date>(new Date())
export const hoveredStartDateAtom = atom<Date | undefined>(undefined)
export const hoveredEndDateAtom = atom<Date | undefined>(undefined)


export const fromAtom = atom<Date | undefined>(new Date(fromMonth))
export const toAtom = atom<Date | null | undefined>(null)
export const fromMonthAtom = atom<number | null| undefined>(new Date(fromMonth).getMonth())
export const fromYearAtom = atom<number | null | undefined>(new Date(toMonth).getFullYear())
export const enteredToAtom = atom<Date | null | undefined>(null)
export const setFromMonthAtom = atom(
    null,
    (_get, set, update: number) => set(fromMonthAtom, new Date(update).getMonth())
);
export const setFromYearAtom = atom(
   null,
    (_get, set, update: number) => set(fromYearAtom,  new Date(update).getFullYear())
)
// export const fromDateAtom = atom(
//     (get) => new Date(get(fromMonthAtom), get(fromYearAtom))
// )

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
export const activeYearAtom = atom(fromMonth.getFullYear())

// 'no selection'
// only start -> '__' 
// start + end -> '___' - '__'
type StageType = 'uninit' | 'started' | 'ended' | 'reset'

const startSelectionCompletedAtom = atom<boolean>(
    (get) => get(hoveredStartDateAtom)===undefined ? true : false
);
const endSelectionCompletedAtom = atom<boolean>(
    (get) => get(hoveredEndDateAtom)===undefined ? true : false 
)
const stageAtom = WritableAtom<StageType, SetStateAction<Date>>(
    (get) => {
        if(get(endSelectionCompletedAtom)!==undefined) return 'ended';
        else if(get(startSelectionCompletedAtom)!==undefined) return 'started'
        else return 'uninit'
    },
    (get: StageType, set: React.SetStateAction<Date>, update: Date) => {

    }
)

export const expirationResultsAtom = atom(
    (get) => {
        return `Duration: ${get(hoveredStartDateAtom) ? get(hoveredStartDateAtom)?.toLocaleDateString() : 'no selection'}`
    }
);