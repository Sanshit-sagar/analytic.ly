import { ReactNode, HTMLAttributes, ReactElement } from 'react'

import { 
    GridRowAria, 
    GridRowProps, 
    GridAria 
} from '@react-aria/grid';

import { GridNode } from '@react-types/grid'

import { Layout } from '@react-stately/virtualizer'
import { SelectionManager } from '@react-stately/selection'


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

type FocusModeType = 'row' | 'cell'
type SortDirection = 'ascending' | 'descending'

type SortDescriptor = {
    column: Key;
    direction: SortDirection;
};

export interface Node<T> {
    type: string;
    key: Key; 
    value: T;
    level: number; 
    hasChildNodes: boolean;
    childNodes: Iterable<Node<T>>;
    rendered: React.ReactNode;
    textValue: string; 
    index?: number;
    element?: (element: ReactElement) => ReactElement;
    parentKey?: Key;
    nextKey?: Key;
    prevKey?: Key;
    props?: any;
}

export type LoadingState = 'loading'
            | 'sorting'
            | 'loadingMore'
            | 'error'
            | 'idle'
            | 'filtering'

export interface TableProps<T> {
    id: string;
    layout?: Layout<Node<T>>;
    isVirtualized?: boolean;
    keyboardDelegate?: KeyboardDelegate;
    focusMode?: FocusModeType;
    getRowText?: (key: Key) => string; 
    scrollRef?: React.RefObject<HTMLElement>; 
    'aria-label': string;
    'aria-labelledBy': string;
    'aria-describedBy': string;
    'aria-details': string; 
}

export interface TableCollection<T> {
    headerRows: GridNode<T>[];
    columns: GridNode<T>[]; 
    rowHeaderColumnKeys: Set<Key>;
    body: GridNode<T>;
    columnCount: number;
    rows: GridNode<T>[]; 
    size: number; 
    getKeys: Iterable<T>;
    getItem: (key: Key) => Node<string>;
    at: (idx: number) => Node<string>;
    getKeyBefore: (key: Key) => Key | null;
    getKeyAfter: (key: Key) => Key | null; 
    getFirstKey: () => Key | null;
    getLastKey: () => Key | null; 
}

export interface TableState<T> {
    collection: TableCollection<T>;
    showSelectionCheckboxes: boolean;
    sortDescriptor: SortDescriptor;
    disabledKeys: Set<Key>;
    selectionManager: SelectionManager;
    sort: (columnKey: Key) => void; 
}

type ValidationState = 'valid' | 'invalid';

export interface AriaCheckboxProps {
    id: string; 
    isIndeterminate: boolean;
    children: ReactNode;
    defaultSelected: boolean;
    isSelected: boolean;
    onChange: (isSelected: boolean) => void;
    value: string;
    name: string; 
    isDisabled: boolean;
    isReadOnly: boolean;
    validationState: ValidationState; 
    isRequired: boolean;
    autoFocus: boolean;
    onFocus: (e: FocusEvent) => void; 
    onBlur: (e: FocusEvent) => void;
    onFocusChange: (e: FocusEvent) => void; 
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    excludeFromTabOrder: boolean; 
    'aria-label': string;
    'aria-controls': boolean; 
    'aria-labeledby': string;
    'aria-describedby': string;
    'aria-details': string;
    'aria-errormessage': string; 
}
type AriaLabelsType = ('aria-label' 
    | 'aria-controls' 
    | 'aria-labeledby'
    | 'aria-describedby' 
    | 'aria-details' 
    | 'aria-errormessage'); 

export type ToggleProps = Omit<AriaCheckboxProps, AriaLabelsType> 

export interface ToggleState {
    isSelected: boolean;
    setSelected: (isSelected: boolean) => void;
    toggle: () => void; 
}

export function getNotNullString<T, K extends keyof T>(stringOrNull: string | null): string => {
    return stringOrNull ?? 'default'
}

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export function  pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map((n) => o[n]);
  }
  