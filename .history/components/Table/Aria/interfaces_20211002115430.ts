import { HTMLAttributes } from 'react'

import { Node } from '@react-types/shared'
import { GridNode } from '@react-types/grid'
import { AriaCheckboxProps } from '@react-types/checkbox'

import { Layout } from '@react-stately/virtualizer'
import { GridRowAria, GridRowProps, GridAria, GridProps } from '@react-aria/grid';

export interface TableProps<T> extends GridProps {
    selectionMode: string
    layout?: Layout<Node<T>>;
    
}

export interface TableCellProps<T> {
    node: GridNode<T>;
    isVirtualized?: boolean;
}

export interface ColumnHeaderProps<T> {
    node: GridNode<T>;
    isVirtualized?: boolean;
}

export interface TableRowProps<T> extends GridRowProps<T> {
    children: React.ReactNode;
    type: string; 
    style: HTMLAttributes<T>; 
    otherProps: {
        node: Node<HTMLElement>;
        isVirtualized?: boolean | undefined;
        shouldSelectOnPressUp?: boolean | undefined;
    }; 
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

export interface KeyboardDelegate {
    getKeyBelow: (key: Key) => Key;
    getKeyAbove: (key: Key) => Key;
    getKeyLeftOf: (key: Key) => Key;
    getKeyRightOf: (key: Key) => Key;
    getKeyPageBelow: (key: Key) => Key;
    getKeyPageAbove: (key: Key) => Key;
    getFirstKey: (key: Key, global: boolean) => Key;
    getLastKey: (key: Key, global: boolean) => Key
    getKeyForSearch: (search: string, fromKey: Key) => Key;
}

type FocusModeType = 'row' | 'cell';

export interface TableProps<T> {
    layout: Layout<Node<T>>;
    isVirtualized?: boolean;
    keyboardDelegate?: KeyboardDelegate;
    focusMode?: FocusModeType;
    getRowText?: (key: Key) => string; 
    scrollRef: React.RefObject<HTMLElement>; 
    id: string;
    'aria-label': string;
    aria-labelledBy': string;

}