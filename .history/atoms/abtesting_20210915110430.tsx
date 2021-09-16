import React from 'react'
import { atom } from 'jotai' 


export const MIN_SLIDER_VALUE = 0.01
export const MAX_SLIDER_VALUE = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

interface IabTestGroup {
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

export const abTestGroups: IabTestGroup[] = [
    { id: 0, url: undefined, percentage: 50 }, 
    { id: 1, url: undefined, percentage: 50 },
]

export const abTestGroupsAtom = atom([...abTestGroups])
export const setUrlAtIndexInTestGroup = atom(
    null,
    (get, set, update: { url: string; index: number; }) => {
        set(abTestGroupsAtom, [
            ...get(abTestGroupsAtom).slice(0, update.index),
            { 
                ...abTestGroups[update.index], 
                url: update.url 
            },
            ...get(abTestGroupsAtom).slice(update.index),
        ]);
    }
);
