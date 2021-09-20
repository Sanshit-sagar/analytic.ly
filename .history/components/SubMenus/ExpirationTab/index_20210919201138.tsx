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
import { enteredToAtom } from './Calendar'

import { Flex } from '../../../primitives/Flex'
import { FmtDate } from './Calendar'
import { StyledExpirationTab } from './Calendar'


const ExirationTab = () => {
    const hoveredStartDate = useAtomValue(hoveredStartDate)
    const 

    return (
        <StyledExpirationTab>
            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
                <FmtDate date={new Date(hoveredStartDate)} fallback={new Date(from)}/> 
                <FmtDate date={new Date(enteredTo)} fallback={new Date(to)} /> 
            </Flex>
        
        </StyledExpirationTab>
    )
}