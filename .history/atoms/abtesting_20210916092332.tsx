import React from 'react'

import { atom } from 'jotai' 
import { splitAtom } from 'jotai/utils'
import { IconProps } from '@radix-ui/react-icons/dist/types'


export const minValue = 0.01
export const maxValue = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10
export const ATOM_ID_START = 0
export const INIT_ATOMS_COUNT = 2

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

function abTestConfigAtomFactory(atomId: number) {
    return {
        id: `${atomId}`, 
        name: `test${atomId}`,
        primaryValue: '', 
        secondaryValue: `test${atomId}-${Math.random()}`,
        primaryField: 'url',
        secondaryField: 'cookie',
        valid: false 
    };
}

function abTestConfigAtomsFactory(firstAtomId: number, count: number) {
    return [...Array(count - firstAtomId)].map((newAtomId: number) => (
        abTestConfigAtomFactory(newAtomId)
    ));
}

export const deletedConfigsAtom = atom([])
export const abTestConfigsAtom = atom([...abTestConfigAtomsFactory(ATOM_ID_START, INIT_ATOMS_COUNT)])
export const abTestConfigsAtomsAtom = splitAtom(abTestConfigsAtom)
export const setAbTestConfigsAtom = atom (
    null,
    (get, set, testGroupCount: number) => {
        let percentages = get(abTestPercentagesAtom)
        let configs = get(abTestConfigsAtom)

        if(configs.length < percentages.length) {
            let newConfigs = abTestConfigAtomsFactory(configs.length, percentages.length - configs.length)
            set(abTestConfigsAtom, [...configs, ...newConfigs]);
        } else if(configs.length > percentages.length) {
            set(deletedConfigsAtom, [])
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
        });

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