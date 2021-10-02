import { HTMLAttributes } from 'react'
import { GridNode } from '@react-types/grid'
import { GridRowAria, GridRowProps } from '@react-aria/grid';

export interface ColumnHeaderProps {
    node: GridNode<unknown>;
    isVirtualized?: boolean;
}

export interface ColumnHeaderAria {
    columnHeaderProps: HTMLAttributes<HTMLElement>
}

interface TableCellProps {
    