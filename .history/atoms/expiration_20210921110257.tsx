import { atom, WritableAtom } from 'jotai'
// import { useFormattedDate } from '../hooks/useDates'

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

enum StageTypeEnum {
    UNINITIALIZED = 'uninit',
    HOVER_START = 'hovering_start',
    START = 'start',
    HOVER_END = 'hovering_end',
    END = 'end',
    RESET = 'reset'
}
type StageType = StageTypeEnum.UNINITIALIZED | StageTypeEnum.HOVER_START | StageTypeEnum.HOVER_END | StageTypeEnum.START | StageTypeEnum.END | StageTypeEnum.RESET

const startSelectionCompletedAtom = atom<boolean>(
    (get) => get(hoveredStartDateAtom)===undefined ? true : false
);
const endSelectionCompletedAtom = atom<boolean>(
    (get) => get(hoveredEndDateAtom)===undefined ? true : false 
)
export const stageAtom: WritableAtom<StageType, Date> = atom(
    (get) => {
        if(get(endSelectionCompletedAtom)!==undefined) return StageTypeEnum.START
        else if(get(startSelectionCompletedAtom)!==undefined) return StageTypeEnum.END
        return StageTypeEnum.UNINITIALIZED
    },
    (get, set, updatedDate: Date) => {
        if(get(startSelectionCompletedAtom)!==undefined) {
            set(hoveredStartDateAtom, updatedDate) 
        } else if(get(endSelectionCompletedAtom)!==undefined) {
            set(hoveredEndDateAtom, updatedDate)
        } 
    }
)

export const expirationStringAtom = atom(
    (get) => {
        return get(stageAtom)=== StageTypeEnum.UNINITIALIZED ? 'n/a' : get(stageAtom)===StageTypeEnum.START ? get(hoveredStartDateAtom)?.toLocaleDateString() : `${get(hoveredStartDateAtom)?.toLocaleDateString()}-$
)

export const expirationResultsAtom = atom(
    (get) => {
        return `Duration: ${get(hoveredStartDateAtom) ? get(hoveredStartDateAtom)?.toLocaleDateString() : get(hoveredEndDateAtom) 'no selection'}`
    }
);