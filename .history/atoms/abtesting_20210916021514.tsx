import { atom } from 'jotai' 

export const minValue = 0.01
export const maxValue = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

export interface IAbTestGroup {
    id: number;
    url: string | undefined;
    percentage: number | undefined; 
};


export const abTestPercentagesAtom = atom([0.5, 0.5])
export const abTestNumGroupsAtom = atom(MIN_ALTERNATES)

export const abTestPercentagesByGroupAtom = atom(
    (get) => {
        let groupCount = get(abTestNumGroupsAtom)
        let percentages = get(abTestPercentagesAtom)
        let percentagesByGroup = []
        let total = 0

        percentages.map((currentPercentage: number, idx: number) => {
            if(idx-1 >= 0) {
                let pctChange = Math.round((currentPercentage - percentages[idx - 1])*100)
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
);

export const initialState: IAbTestGroup[] = [
    { 
        id: 0, 
        url: undefined, 
        cookie: `Secret-is-${Math.random()}`,
        validated: false,
    }, 
    { 
        id: 1, 
        url: undefined, 
        configured: false,
    }
]

export const activeUrlIndexAtom = atom(undefined)

export const abTestingConfigsAtom = atom(initialState)
export const abTestingConfigsAtomsAtom = splitAtom(abTestingConfigsAtom)
    null,
    (get, set, update: { url: string; index: number; }) => {
        
        let abTestGroups = get(abTestGroupsAtom)
        let updatedTestGroups: IabTestGroup[] = []

        abTestGroups.map((group, index: number) => {
            if(update.index !== index) {
                updatedTestGroups.push({ ...group })
            } else {
                updatedTestGroups.push({ 
                    id: group.id, 
                    url: update.url,
                    percentage: group.percentage 
                })
            }
        })
        set(abTestGroupsAtom, [...updatedTestGroups]); 
    }
);
