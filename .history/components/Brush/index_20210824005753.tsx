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

const start:  Atom<Date> = atom(new Date(2021, 6, 1));
const end: Atom<Date> = atom(new Date(1970,1,1)); 
const startTimestamp: Atom<number> = atom((get) => get(start).getTime());
const endTimestamp: Atom<number> = atom((get) => get(end).getTime()); 
const range: Atom<number> = atom((get) => get(startTimestamp) - get(endTimestamp)) 

const Timeseries = () => {
    const [range] = useAtom(range);
    const [start, setStart] = useAtom(start);
    const [end, setEnd] =  useAtom(end); 
    
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