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
    Calendar 
} from './Calendar'


const StyledExpirationTab = styled('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    jc: 'space-between',
    ai: 'cent'
});

const StyledCalendarContainer = styled(Box, {
    width: '375px',
    height: '375px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-start',
    ai: 'center',
    gap: '$1',
    margin: 0,
    mt: '$2',
    bc: 'transparent',
    border: '1px solid $border', 
    br: '$2',
    '&:hover': {
        border: '2px solid border3', 
        br: '$2'
    }
});



export const ExpirationTabContent = () => {
    const to = useAtomValue(toAtom)
    const from = useAtomValue(fromAtom)
    const enteredTo = useAtomValue(enteredToAtom)
    const hoveredStartDate = useAtomValue(hoveredStartDateAtom)

    return (
        <StyledCalendarContainer>

            <Calendar />

        </StyledCalendarContainer>

        <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
            <FmtDate date={new Date(hoveredStartDate)} fallback={new Date(from)}/> 
            <FmtDate date={new Date(enteredTo)} fallback={new Date(to)} /> 
        </Flex>
        
        </StyledExpirationTab>
    )
}

