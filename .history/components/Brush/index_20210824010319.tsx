import React from 'react';
import { useAtom, atom } from 'jotai'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { GraphSkeleton } from '../Skeletons/index'
import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared' 

import { useClickHistoryForUser } from '../../hooks/useClicks'

const amountAtom: Atom<number> = atom(1)
const amountStrAtom: Atom<string> = ((get) => `${get(amount)}`)
const rangeAtom: Atom<string> = atom('week')
const intervalAtom: Atom<string> = atom('day')

const AmountInput = () => {
    const [amount, setAmount] = useAtom(amountAtom); 
    const [amountStr] = useAtom()
}

const Timeseries = () => {
    
    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amountStr, range, interval);

    if(loading) return <GraphSkeleton />;
    if(error) return <Text>Error: {error.message} </Text> 

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 

                <Box css={{ border: 'thin solid black', br: '$2'}}> 
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2' }}> 
                        <Text> Start Timestamp: {minTimestamp} </Text> 
                        <Text size='1'> {JSON.stringify(clicks)} </Text>

                    </Flex>
               </Box>
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries