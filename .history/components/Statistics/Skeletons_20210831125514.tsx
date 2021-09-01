import React from 'react'

import { Skeleton } from '../../primitives/Skeleton'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

export const StatsSkeletons = () => {

    return (
        <Box style={{ height: '350px', width: '500px', border: 'thin solid black', br: '$2' }}>
            <Flex css={{ fd: 'column', gap: '$4', mb: '$7' }}>
              <Skeleton variant="title" css={{ width: '50%' }} />
              <Skeleton variant="heading" css={{ width: '25%' }} />
            </Flex>

            <Flex css={{ fd: 'column', gap: '$4', mb: '$7' }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" css={{ width: '75%' }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" css={{ width: '50%' }} />
            </Flex>
        </Box>
    )
}

