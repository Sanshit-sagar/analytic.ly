import { atom } from 'jotai' 
import { splitAtom } from 'jotai/utils'

export const minValue = 0.01
export const maxValue = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

export interface IAbTestGroup {
    id: number;
    url: string | undefined;
    cookie: string;
    valid: boolean; 
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
        cookie: `test0-${Math.random()}`,
        valid: false,
    }, 
    { 
        id: 1, 
        url: undefined, 
        cookie: `test1-${Math.random()}`,
        valid: false,
    }
]

export const activeUrlIndexAtom = atom(undefined)

export const abTestConfigsAtom = atom(initialState)
export const abTestConfigsAtomsAtom = splitAtom(abTestConfigsAtom)

const AbTestConfigsList = () => {
    const [abTestConfigsAtom, removeAbTestConfigsAtom] = useAtom(abTestingConfigsAtomsAtom)

    return (
        <ul>
            {abTestConfigsAtom.map((abTestConfigAtom) => (
                <AbTestConfig
                    abTestgConfigAtom={abTestConfigAtom}
            ))
        </ul>
    )
}