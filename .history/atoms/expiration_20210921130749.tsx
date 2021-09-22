import React from 'react'
import { atom, WritableAtom } from 'jotai'
// import { useFormattedDate } from '../hooks/useDates'

export const fromMonth = new Date(new Date().getFullYear(), new Date().getMonth())
export const toMonth = new Date(new Date().getFullYear() + 1, new Date().getMonth() + 1)

export const activeMonthAtom = atom(fromMonth.getMonth())
export const activeYearAtom = atom(fromMonth.getFullYear())

const currentPageAtom = atom((get) => new Date(get(activeYearAtom), get(activeMonthAtom)))
export const activePageAtom: WritableAtom<Date, Date> = atom(
    (get) => get(currentPageAtom),
    (get, set, update: Date) => {
        set(currentPageAtom, new Date(update))

        let mm = get(currentPageAtom).getMonth()
        let yyyy = get(currentPageAtom).getFullYear()
        set(activeMonthAtom, mm)
        set(activeYearAtom, yyyy)
    }
);

export const fromAtom = atom<Date | undefined>(undefined)
export const toAtom = atom<Date | undefined>(undefined)
export const hoveredStartDateAtom = atom<Date | undefined>(undefined)
export const hoveredEndDateAtom = atom<Date | undefined>(undefined)


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
);

export const stageAtom: WritableAtom<StageType, Date> = atom(
    (get) => {
        if(get(endSelectionCompletedAtom)) return StageTypeEnum.END
        else if(get(startSelectionCompletedAtom)) return StageTypeEnum.START
        return StageTypeEnum.UNINITIALIZED
    },
    (get, set, updatedDate: Date) => {
        if(get(startSelectionCompletedAtom)) {
            set(hoveredStartDateAtom, updatedDate) 
        } else if(get(endSelectionCompletedAtom)) {
            set(hoveredEndDateAtom, updatedDate)
        } 
    }
)

export const expirationResultsAtom = atom(
    (get) => {
        return get(stageAtom)=== StageTypeEnum.UNINITIALIZED ? 'n/a' : get(stageAtom)===StageTypeEnum.START ? get(hoveredStartDateAtom)?.toLocaleDateString() : `${get(hoveredStartDateAtom)?.toLocaleDateString()} to ${get(hoveredEndDateAtom)?.toLocaleDateString()}`;
    }
)

// export const expirationResultsAtom = atom(
//     (get) => {
//         return `Duration: ${get(hoveredStartDateAtom) ? get(hoveredStartDateAtom)?.toLocaleDateString() : get(hoveredEndDateAtom) 'no selection'}`
//     }
// );