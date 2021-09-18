import { atom } from 'jotai' 
import { splitAtom } from 'jotai/utils'

export const minValue = 0.01
export const maxValue = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

export interface IAbTestGroup {
    id: number;
    name: string; 
    value: string | undefined;
    secondaryValue: string;
    primaryName: string;
    valid: boolean; 
};

export type AbTestConfigType = typeof initialState[number]

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

interface ITreeNodeItem {
    id: string;
    name: string; 
    label?: string; 
    primaryValue: string;
    secondaryValue?: string | undefined; 
    primaryField: string;
    secondaryField?: string | undefined;
    isValid?: boolean;
    isDisabled?: boolean; 
    defaultOpen?: boolean;
    styles?: React.HTMLAttributes<HTMLDivElement>;
    icon: React.ReactNode | Element; 
}

export const initialState: ITreeNodeItem[] = [
    { 
        id: 0, 
        name: 'test0',
        primaryValue: '', 
        secondaryValue: `test0-${Math.random()}`,
        primaryField: 'url',
        secondaryField: 'cookie',
        isValid: false,
        isDisabled: false,
    }, 
    { 
        id: 1, 
        name: 'test1',
        label: ''
        primaryValue: '', 
        secondaryValue: `test1-${Math.random()}`,
        primaryField: 'url',
        secondaryField: 'cookie',
        isValid: false,
        isDisabled: false,
    }
]

export const abTestConfigsAtom = atom(initialState)
export const abTestConfigsAtomsAtom = splitAtom(abTestConfigsAtom)

// TODO: Configure this if needed ? 
export const activeUrlIndexAtom = atom(undefined)