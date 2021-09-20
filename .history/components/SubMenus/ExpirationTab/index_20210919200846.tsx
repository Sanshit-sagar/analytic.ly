import React from "react"

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    fromAtom, 
    toAtom, 
    fromMonthAtom, 
    toMonthAtom, hoveredStartDateAtom } from '../../../atoms/expiration'
import { enteredToAtom } from './Calendar'


const ExirationTab = () => {

    return (
        <StyledExpirationTab>
            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
                <FmtDate date={new Date(hoveredStartDate)} fallback={new Date(from)}/> 
                <FmtDate date={new Date(enteredTo)} fallback={new Date(to)} /> 
            </Flex>
        
        </StyledExpirationTab>
    )
}