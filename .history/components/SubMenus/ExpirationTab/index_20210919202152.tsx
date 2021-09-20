import React from "react"

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    fromMonth, 
    toMonth,
    hoveredStartDateAtom,
    fromMonthAtom,
    fromYearAtom,
    fromDateAtom,
    setFromDateAtom
} from '../../../atoms/expiration'

import { toAtom }
import { enteredToAtom } from './Calendar'

import { Flex } from '../../../primitives/Flex'
import { FmtDate, StyledExpirationTab } from './Calendar'
import { StyledExpirationTab } from '.'


const ExirationTab = () => {
    const hoveredStartDate = useAtomValue(hoveredStartDateAtom)
    const from = useAtomValue(fromAtom)
    const enteredTo = useAtomValue(enteredToAtom)
    const to = useAtomValue(toAtom)

    return (
        <StyledExpirationTab>
            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
                <FmtDate date={new Date(hoveredStartDate)} fallback={new Date(from)}/> 
                <FmtDate date={new Date(enteredTo)} fallback={new Date(to)} /> 
            </Flex>
        
        </StyledExpirationTab>
    )
}