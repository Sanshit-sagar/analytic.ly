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



export const ExpirationTabContent = () => {

    return <Calendar />
}

