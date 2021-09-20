import React from "react"

import { useAtomValue } from 'jotai/utils'
import { 
    toAtom,
    fromAtom,
    enteredToAtom,
    hoveredStartDateAtom
} from '../../../atoms/expiration'

import { Flex } from '../../../primitives/Flex'
import { 
    FmtDate, 
    StyledExpirationTab, 
    Calendar } from './Calendar'


export const ExpirationTabContent = () => {
    const to = useAtomValue(toAtom)
    const from = useAtomValue(fromAtom)
    const enteredTo = useAtomValue(enteredToAtom)
    const hoveredStartDate = useAtomValue(hoveredStartDateAtom)

    return (
        <StyledExpirationTab>
            <Calendar /> 
            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
                <FmtDate 
                    date={new Date(hoveredStartDate)} 
                    fallback={new Date(from)} 
                /> 
                <FmtDate 
                    date={new Date(enteredTo)} 
                    fallback={new Date(to)} 
                /> 
            </Flex>
        </StyledExpirationTab>
    )
}

