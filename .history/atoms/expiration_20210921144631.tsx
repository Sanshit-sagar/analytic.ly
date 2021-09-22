import { atom, WritableAtom } from 'jotai'
import { useFormattedDate } from '../hooks/useDates'

const format = (d: Date | undefined) => d===undefined ? 'n/a' : useFormattedDate(d) 

enum StageTypeEnum {
    UNINITIALIZED = 'uninit',
    HOVER_START = 'hovering_start',
    START = 'start',
    HOVER_END = 'hovering_end',
    END = 'end',
    RESET = 'reset'
}

type StageType = (
    StageTypeEnum.UNINITIALIZED | 
    StageTypeEnum.HOVER_START | 
    StageTypeEnum.HOVER_END | 
    StageTypeEnum.START | 
    StageTypeEnum.END | 
    StageTypeEnum.RESET
)

export const fromMonth = new Date(new Date().getFullYear(), new Date().getMonth())
export const toMonth = new Date(new Date().getFullYear() + 1, new Date().getMonth() + 1)

//// used to store start + end of range 
export const fromAtom = atom<Date | undefined>(undefined)
export const toAtom = atom<Date | undefined>(undefined)
export const hoveredStartDateAtom = atom<Date | undefined>(undefined)
export const hoveredEndDateAtom = atom<Date | undefined>(undefined)

//// used to store currently displayed page on calendar
export const activeMonthAtom = atom(fromMonth.getMonth())
export const activeYearAtom = atom(fromMonth.getFullYear())
const currentPageAtom = atom(new Date(fromMonth))

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



const startSelectionCompletedAtom = atom<boolean>(
    (get) => get(hoveredStartDateAtom)===undefined ? false : true
)
const endSelectionCompletedAtom = atom<boolean>(
    (get) => get(hoveredEndDateAtom)===undefined ? false : true 
)

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
        switch(get(stageAtom)) {
            case(StageTypeEnum.UNINITIALIZED): {
                return 'n/a';
            }
            case(StageTypeEnum.START): {
                return `${format(get(hoveredStartDateAtom))}`
            }
            case(StageTypeEnum.END): {
                return `${format(get(hoveredStartDateAtom))} to ${format(get(hoveredEndDateAtom))}`
            }
            case(StageTypeEnum.RESET): {
                return `reset`
            }
            default: {
                return `error`
            }
        }
    }
)

// export const expirationResultsAtom = atom(
//     (get) => {
//         return `Duration: ${get(hoveredStartDateAtom) ? get(hoveredStartDateAtom)?.toLocaleDateString() : get(hoveredEndDateAtom) 'no selection'}`
//     }
// );

