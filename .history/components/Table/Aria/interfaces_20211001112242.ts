import { HTMLAttributes } from 'react'
import { GridNode } from '@'
interface ColumnHeaderProps {
    node: GridNode<unknown>;
    isVirtualized?: boolean;
}

interface ColumnHeaderAria {
    columnHeaderProps: HTMLAttributes<HTMLElement>
}