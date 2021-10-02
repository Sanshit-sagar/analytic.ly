import { HTMLAttributes } from 'react'

import { Node } from '@react-types/shared'
import { GridNode } from '@react-types/grid'
import { AriaCheckboxProps } from '@react-types/checkbox'

import { Layout } from '@react-stately/virtualizer'
import { GridRowAria, GridRowProps, GridAria, GridProps } from '@react-aria/grid';

export interface TableProps<T> extends GridProps {
    layout?: Layout<Node<T>>;
}

export interface TableCellProps {
    node: GridNode<unknown>;
    isVirtualized?: boolean;
}

export interface ColumnHeaderProps {
    node: GridNode<unknown>;
    isVirtualized?: boolean;
}

export interface TableRowProps<T> extends GridRowProps<T> {
    
}

export interface SelectionCheckboxProps {
    key: Key;
}


export interface TableCellAria {
    gridCellProps: HTMLAttributes<HTMLElement>;
}

export interface ColumnHeaderAria {
    columnHeaderProps: HTMLAttributes<HTMLElement>;
}

export interface TableRowAria extends GridRowAria {
    
}
  
export interface SelectionCheckboxAria {   
    checkboxProps: AriaCheckboxProps;
}
  
export interface SelectAllCheckboxAria {
    checkboxProps: AriaCheckboxProps;
}
  