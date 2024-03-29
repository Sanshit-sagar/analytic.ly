import { PrimitiveAtom, atom } from 'jotai' 
import { splitAtom } from 'jotai/utils'

export const minValue = 0.01
export const maxValue = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10
export const ATOM_ID_START = 0
export const INIT_ATOMS_COUNT = 2

export interface IAbTestConfigItem {
    id: string;
    name: string;
    primaryValue: string;
    primaryField: string;
    secondaryValue: string | undefined;
    secondaryField: string;
    valid: boolean;
}

export type AbTestConfigItemAtom = PrimitiveAtom<IAbTestConfigItem>

export function abTestConfigAtomFactory(atomId: number): AbTestConfigItemAtom {
    const abTestConfigItemAtom: AbTestConfigItemAtom = atom({
        id:`${atomId || '0'}`, 
        name:`test${atomId || '0'}`,
        primaryValue: '', 
        secondaryValue: atomId ? `test${atomId}-${Math.random()}` : undefined,
        primaryField: 'url',
        secondaryField: 'cookie',
        valid: atomId!==0 ? false : true 
    });
    return abTestConfigItemAtom;
}

export function abTestConfigAtomsFactory(firstAtomId: number, count: number): AbTestConfigItemAtom[] {
    return [...Array(count - firstAtomId)].map((newAtomId: number) => (
        abTestConfigAtomFactory(newAtomId)
    ));
}

export const idAtom = atom('')
export const nameAtom = atom('')
export const primaryValueAtom = atom('')
export const primaryFieldAtom = atom('')
export const secondaryValueAtom = atom('')
export const validAtom = atom(false)


export const abTestConfigsAtom = atom([...abTestConfigAtomsFactory(ATOM_ID_START, INIT_ATOMS_COUNT)])
export const abTestConfigsAtomsAtom = splitAtom(abTestConfigsAtom)

export const baseSelectedAbTestConfigsAtom = atom<AbTestConfigItemAtom | null>(null); 
export const selectedAbTestConfigsAtom = atom(
    (get) => get(baseSelectedAbTestConfigsAtom),
    (get, set, abTestConfigItemAtom: AbTestConfigItemAtom | null) => {
        set(baseSelectedAbTestConfigsAtom, abTestConfigItemAtom)
        if(abTestConfigItemAtom) {
            const { id, name, primaryValue, secondaryValue, valid } = get(abTestConfigItemAtom)
            set(idAtom, id),
            set(nameAtom, name),
            set(primaryValueAtom, primaryValue)
            set(secondaryValueAtom, secondaryValue || '')
            set(validAtom, valid)
        }
    }
)

export const createAbTestConfigAtom = atom(
    (get) => !!get(nameAtom) && !!get(primaryValueAtom) && !!get(idAtom),
    (get, set) => {
        const abTestConfigsCount = get(abTestConfigsAtom).length
        const abTestConfigsAdditionAtom: AbTestConfigItemAtom = abTestConfigAtomFactory(abTestConfigsCount + 1)
        set(abTestConfigsAtom, (prev) => [...prev, abTestConfigsAdditionAtom])
        set(idAtom, get(abTestConfigsAdditionAtom).id)
        set(nameAtom, get(abTestConfigsAdditionAtom).name)
        set(primaryValueAtom, get(abTestConfigsAdditionAtom).primaryValue)
        set(secondaryValueAtom, get(abTestConfigsAdditionAtom)?.secondaryValue || '')
        set(validAtom, get(abTestConfigsAdditionAtom).valid)     
        set(selectedAbTestConfigsAtom, null);  
    }
)

export const updateAbTestConfigAtom = atom(
    (get) => !!get(nameAtom) && !!get(primaryValueAtom) && !!get(abTestConfigsAtom),
    (get, set) => {
        const id = get(idAtom)
        const name = get(nameAtom)
        const primaryValue = get(primaryValueAtom)
        const secondaryValue = get(secondaryValueAtom)
        const primaryField = get(primaryFieldAtom)
        const valid = get(validAtom)

        const selected = get(selectedAbTestConfigsAtom)

        if(id && name && primaryValue && secondaryValue && valid &&  selected) {
            set(selected, { 
                id, 
                name, 
                primaryValue, 
                primaryField, 
                secondaryField: 'cookie',
                secondaryValue,           
                valid
            });
        }
    }
)

export const deleteAbTestConfigAtom = atom(
    (get) => !!get(nameAtom) && !!get(idAtom),
    (get, set) => {
        const selected = get(selectedAbTestConfigsAtom)
        if(selected) {
            set(abTestConfigsAtom, (prev) => prev.filter((item) => item !== selected))
        }
    }
)


export type AbTestConfigType = typeof abTestConfigsAtom

export const abTestPercentagesAtom = atom([0.5, 0.5])
export const abTestNumGroupsAtom = atom(MIN_ALTERNATES)

export const abTestPercentagesByGroupAtom = atom(
    (get) => {
        let total = 0
        let percentagesByGroup = []
        let groupCount = get(abTestNumGroupsAtom)
        let percentages = get(abTestPercentagesAtom)
        
        percentages.map((currentPercentage: number, idx: number) => {
            if(idx-1 >= 0) {
                let pctChange =  Math.round((currentPercentage - percentages[idx - 1])*100)
                percentagesByGroup.push(pctChange)
                total += pctChange
            }
        })

        if(total < 100 && groupCount > percentagesByGroup.length) {
            percentagesByGroup.push(100-total)
            ++groupCount; 
        } else if(groupCount >= percentagesByGroup.length) {
            percentagesByGroup[percentagesByGroup.length - 1] = 100 - total
        }

        return percentagesByGroup
    }
)


// TODO: Configure this if needed ? 
export const activeUrlIndexAtom = atom(undefined)