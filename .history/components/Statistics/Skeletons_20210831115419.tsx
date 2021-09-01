import React from 'react'
import { Skeleton } from '../../primitives/Skeleton'
import { Flex } from '../../primitives/Flex'

const StatsFallback = () => {

    return (
        <>
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
        </>
    )
}

