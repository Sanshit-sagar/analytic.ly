import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Skeleton } from '../../primitives/Skeleton'

const NUM_PANELS = 6

const StatsSidebar = () => {

    return (
        <Skeleton variant='sidebar'>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                {[...Array(NUM_PANELS)].map((index: number) => (
                    <StatPanel key={`Skeleton-for-sidebar-panel-at-index-${index}`} /> 
                ))}
            </Flex>
        </Skeleton>
    );
}

const StatPanel = () => {

    return (
        <Skeleton variant='statistic'>
            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-end', gap: '$2' }}>
                <Flex css={{ height: '100%', width: '300px', fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                    <Skeleton variant='title' />
                    <Skeleton variant='subtitle' />
                </Flex>
                <Skeleton variant='animatedNumerical' />
            </Flex>
        </Skeleton>
    );
}

export const StatisticsSkeleton = StatsSidebar