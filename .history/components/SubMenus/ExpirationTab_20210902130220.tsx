import React from 'react'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { atom, useAtom } from 'jotai'

const getTMinus1Sec = () => new Date()
const getTPlus1M = () => new 

export const newSlugTimeframeStartAtom = atom<Date>(getCurrentDate());
export const newSlugTimeframeEndAtom = atom<Date>(new Date(new Date().getTime() + 1000*60));
export const newSlugTimeRange = atom<number>(
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