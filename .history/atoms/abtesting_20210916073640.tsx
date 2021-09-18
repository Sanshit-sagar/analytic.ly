import { IconProps } from '@radix-ui/react-icons/dist/types'
import { atom } from 'jotai' 
import { splitAtom } from 'jotai/utils'
import React from 'react'

export const minValue = 0.01
export const maxValue = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10


export const initialState: ITreeNodeItem[] = [
    { 
            id: '0', 
            name: 'test0',
            primaryValue: '', 
            secondaryValue: `test0-${Math.random()}`,
            primaryField: 'url',
            secondaryField: 'cookie',
            valid: false
    }, { 
            id: '1', 
            name: 'test1',
            primaryValue: '', 
            secondaryValue: `test1-${Math.random()}`,
            primaryField: 'url',
            secondaryField: 'cookie',
            valid: false
        }
    ];
    

interface ITreeNodeItem {
    id: string;
    name: string; 
    label?: string; 
    primaryValue: string;
    secondaryValue?: string | undefined; 
    primaryField: string;
    secondaryField?: string | undefined;
    valid?: boolean;
    disabled?: boolean; 
    defaultOpen?: boolean;
    styles?: React.HTMLAttributes<HTMLDivElement>;
    icon?: Element | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}

export const abTestConfigsAtom = atom(initialState)
export const abTestConfigsAtomsAtom = splitAtom(abTestConfigsAtom)

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
)

// TODO: Configure this if needed ? 
export const activeUrlIndexAtom = atom(undefined)