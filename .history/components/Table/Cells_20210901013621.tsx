import React from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { IStyledCellProps } from './interfaces'

export const StyledCell = ({ value, xshort, short, long, longish, xlong }: IStyledCellProps) => {
    if(!value) return null

    const getLength = () => {
        return xlong ? '200px' : long ? '155px' : longish ? '135px' : short ? '50px' : xshort ? '30px' : '100px';
    }

    return (
        <Box css={{ width: getLength(), height: '40px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'flex-start'}}>
                <Text> {value} </Text> 
            </Flex>
        </Box>
    )
}

export const StyledHeader = ({ value }: { value: string }) => {

    return (
        <Text 
            size='1' 
            as='span' 
            css={{ color: '$accent'}}
        > {value.toUpperCase()} </Text>
    );
}