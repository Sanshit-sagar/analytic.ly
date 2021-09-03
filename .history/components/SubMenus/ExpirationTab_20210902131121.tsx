import React from 'react'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { atom, useAtom } from 'jotai'

const getMillisInXMins = (x: number): number => 1000*60*x;  
const getTMinus1Min = () => new Date().getTime() - getMillisInXMins(1)
const getTPlus1Min = () => new Date().getTime() + getMillisInXMins(1)
const getDateAtTminus1min: Date = new Date(getTMinus1Min)
const getDateAtTplus1min: Date = new Date(getTPlus1Min)

export const newSlugTimeframeStartAtom = atom<Date>(getDateAtTminus1min)
export const newSlugTimeframeEndAtom = atom<Date>(getDateAtTplus1min)
export const newSlugTimeframeStartInMsAtom = atom((get) => get(newSlugTimeframeStartAtom).getTime());
export const newSlugTimeframeEndInMsAtom = atom((get) => get(newSlugTimeframeEndAtom).getTime());
export const newSlugTimeRange = atom<number>((get) =>get(newSlugTimeframeEndInMsAtom) - getnewSlugTimeframeStartInMsAtom()))
    (get) => 
    (get,set,)
)

const WritableExpirationTab = () => {
    const setTimeframeStart = useAtom(newSlugTimeframeStartAtom)
    const setTimeframeEnd = useAtom(newSlugTimeframeEndAtom)

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center', gap: '$1' }}> 
            <Text size='5' css={{ color: '$text' }}>
                {timeframeStart.toLocaleDateString()}
            </Text>
        </Flex>
    )
}

const ExpirationTabContent = () => {
   
   


   
   
   
   
   
   
   
}


export default ExpirationTabContent