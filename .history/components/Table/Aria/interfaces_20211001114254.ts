import { HTMLAttributes } from 'react'

import { Node } from '@react-types/shared'
import { GridNode } from '@react-types/grid'
import { AriaCheckboxProps } from '@react-types/checkbox'

import { Layout } from '@react-stately/virtualizer'
import { GridRowAria, GridRowProps, GridAria, GridProps } from '@react-aria/grid';

export interface TableProps<T> extends GridProps {
    layout?: Layout<Node<T>>;
    isVirtualized?: boolean,
    /**
     * An optional keyboard delegate implementation for type to select,
     * to override the default.
     */
    keyboardDelegate?: KeyboardDelegate,
    /**
     * Whether initial grid focus should be placed on the grid row or grid cell.
     * @default 'row'
     */
    focusMode?: 'row' | 'cell',
    /**
     * A function that returns the text that should be announced by assistive technology when a row is added or removed from selection.
     * @default (key) => state.collection.getItem(key)?.textValue
     */
    getRowText?: (key: Key) => string,
    /**
     * The ref attached to the scrollable body. Used to provided automatic scrolling on item focus for non-virtualized grids.
     */
    scrollRef?: RefObject<HTMLElement>
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

export interface SelectAllCheckboxProps {
    key: Key;
}

///////////////////////////////////////

export interface TableAria extends GridAria {
    
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
  