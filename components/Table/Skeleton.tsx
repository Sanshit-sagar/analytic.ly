import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Skeleton } from '../../primitives/Skeleton'
import { ScrollArea } from '../../primitives/ScrollArea'

const NUM_ROWS = 20

export const TableSkeleton = () => {

    return (
        
        <ScrollArea>
            <Skeleton variant='table'>
                <Skeleton variant='tableHeader' /> 

                <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: 0 }}>
                    {[...Array(NUM_ROWS)].map((index: number) => (
                        <RowSkeleton key={`Skeleton-for-table-row-at-index-${index}`} /> 
                    ))}
                </Flex>
            </Skeleton>
        </ScrollArea>
    );
}

type CellVariantType = "cell" | "cellShort" | "cellLong" | "cellXLong" | "cellXShort"

const RowSkeleton = () => {
    const cellSkeletonVariants: CellVariantType[] = ['cellXShort', 'cellShort', 'cell', 'cellLong', 'cellXLong']
    const cells = [1,4,3,1,0,0,3,2,3,0,0,0,0,3,4]

    return (
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'center', gap: 0 }}> 
            {cells.map((variant: number, index: number) => {
                let indexedVariant: CellVariantType = cellSkeletonVariants[variant]
                
                return (
                    <Skeleton 
                        key={index} 
                        variant={indexedVariant}
                    />
                );
            })}
        </Flex>
    );
}