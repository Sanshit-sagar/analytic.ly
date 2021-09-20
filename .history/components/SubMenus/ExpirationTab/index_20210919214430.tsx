import React from "react"
import { styled } from '../../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import { 
    toAtom,
    fromAtom,
    enteredToAtom,
    hoveredStartDateAtom
} from '../../../atoms/expiration'

import { Box } from '../../../primitives/Box'
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


    return <Calendar />
}

