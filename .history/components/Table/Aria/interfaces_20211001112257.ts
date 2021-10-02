import { HTMLAttributes } from 'react'
import { GridNode } from '@react-types/grid'

interface ColumnHeaderProps {
    node: GridNode<unknown>;
    isVirtualized?: boolean;
}

interface ColumnHeaderAria {
    columnHeaderProps: HTMLAttributes<HTMLElement>
}