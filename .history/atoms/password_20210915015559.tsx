import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

export const meterValueAtom = atom(5)
export const meterMaxMinAtom = atom({ min: 0, max: 100 })

export const passwordAtom = atom('')
export const isCondition1MetAtom = atom((get) => get(passwordAtom).length >= 5)
export const isCondition2MetAtom = atom((get) => get(passwordAtom).length >= 8)
export const isCondition3MetAtom = atom((get) => get(passwordAtom).length >= 12)
export const isCondition4MetAtom = atom((get) => get(passwordAtom).length >= 15)
export const isCondition5MetAtom = atom((get) => get(passwordAtom).length >= 20)

export const setMeterAndPasswordAtom = atom(
    null,
    (get, set, update: React.SetStateAction<string>) => {
        set(passwordAtom, update);

        let c1Met = get(isCondition1MetAtom)
        let c2Met = get(isCondition2MetAtom)
        let c3Met = get(isCondition3MetAtom)
        let c4Met = get(isCondition4MetAtom)
        let c5Met = get(isCondition5MetAtom)

        let maxAllowed = get(meterValueAtom)

        maxAllowed = !c1Met ? 5 

        if(!cond1Met) maxAllowed = 5
        else if(!cond2Met) maxAllowed = 25
        else if(!cond3Met) maxAllowed = 45
        else if(!cond4Met) maxAllowed = 65
        else if(!cond5Met) maxAllowed = 85
        else maxAllowed = 100

        set(meterValueAtom, maxAllowed)
    }
);

export const meterPercentageAtom = atom(
    (get) => {
        let {min, max} = get(meterMaxMinAtom)
        let val = get(meterValueAtom)

        return ((val-min)/max - min)*100
    }
);

export const meterColorAtom = atom(
    (get) => {
        let val = get(meterValueAtom)
        return val <= 10 ? 'black' 
            : val <= 30 ? 'red' 
            : val <= 50 ? 'orange' 
            : val <= 70 ? 'yellow' 
            : val <= 90 ? 'lime' 
            : 'green'
    }
)
