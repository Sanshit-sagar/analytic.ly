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

const amount: Atom<number> = atom(1)
const amountStr: Atom
const range: Atom<string> = atom('week')
const interval: Atom<string> = atom('day')

const Timeseries = () => {
    const [amount, setAmount] = useAtom()
    
    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

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