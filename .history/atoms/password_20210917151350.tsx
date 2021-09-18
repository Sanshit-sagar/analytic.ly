import { atom } from 'jotai'

export const meterValueAtom = atom(5)
export const meterMaxMinAtom = atom({ min: 0, max: 100 })

export const passwordAtom = atom('')
export const isCondition1MetAtom = atom((get) => get(passwordAtom).length >= 5)
export const isCondition2MetAtom = atom((get) => get(passwordAtom).length >= 8)
export const isCondition3MetAtom = atom((get) => get(passwordAtom).length >= 12)
export const isCondition4MetAtom = atom((get) => get(passwordAtom).length >= 15)
export const isCondition5MetAtom = atom((get) => get(passwordAtom).length >= 20)

export const isPasswordValidAtom = atom(
    (get) =>{
        let met1n2 = get(isCondition1MetAtom) && get(isCondition2MetAtom)
        let met3n4 = get(isCondition3MetAtom) && get(isCondition4MetAtom)
        let met5 = get(isCondition5MetAtom)

        return met1n2 && met3n4 && met5
    }
);

export const setMeterAndPasswordAtom = atom(
    null,
    (get, set, update: React.SetStateAction<string>) => {
        set(passwordAtom, update);

        let c1Met = get(isCondition1MetAtom)
        let c2Met = get(isCondition2MetAtom)
        let c3Met = get(isCondition3MetAtom)
        let c4Met = get(isCondition4MetAtom)
        let c5Met = get(isCondition5MetAtom)

        let maxAllowed = !c1Met ? 5 
            : !c2Met ? 25 
            : !c3Met ? 35 
            : !c4Met ? 65 
            : !c5Met ? 85 
            : 100

        set(meterValueAtom, maxAllowed)
    }
);

export const meterPercentageAtom = atom(
    (get) => {
        let {min, max} = get(meterMaxMinAtom)
        let val = get(meterValueAtom)
        return ((val-min)/max - min)*100
    }
)

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

const pwValidAtom = atom((get) => `Password: ${get(isPasswordValidAtom)}`)
export const passwordResultsAtom = atom((get) => {
    `Password(${get(pwValidAtom) ? 'ye' :'ne'}): ${get(passwordAtom)}`
)
