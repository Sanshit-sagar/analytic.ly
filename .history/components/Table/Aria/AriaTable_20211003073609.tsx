import React, { useState, useRef, RefObject } from 'react'

import {
    useTable, 
    useTableCell, 
    useTableColumnHeader, 
    useTableHeaderRow,
    useTableRow, 
    useTableRowGroup, 
    useTableSelectAllCheckbox, 
    useTableSelectionCheckbox
} from '@react-aria/table'
import {
    useTableState, 
    TableState
} from '@react-stately/table'

import { mergeProps } from '@react-aria/utils'
import { useFocusRing } from '@react-aria/focus'
import { useCheckbox } from '@react-aria/checkbox'
import { useHover } from '@react-aria/interactions'

import { useToggleState } from '@react-stately/toggle'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useGloballyConsistentColors } from '../../../hooks/useColors'

import { Node } from '@react-types/shared'
import { GridNode } from '@react-types/grid'
import { TableCollection } from '@react-types/table'

import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons'

export function Table(props: any) {

    let state: TableState<HTMLTableElement> = useTableState({ 
        ...props, 
        showSelectionCheckboxes: props.selectionMode === 'multiple',
    });
    let ref: RefObject<HTMLTableElement> = useRef<HTMLTableElement>(null!)
   
    let bodyRef: RefObject<HTMLElement> = useRef<HTMLElement>(null!)
    let { collection }: { collection: TableCollection<HTMLTableElement> } = state
    let { gridProps } = useTable({ ...props, scrollRef: bodyRef }, state, ref)

    const colors = useGloballyConsistentColors()

    return (
        <table 
            ref={ref} 
            {...gridProps} 
            style={{ borderCollapse: 'collapse' }}
        >
            <TableRowGroup 
                type='thead'
                style={{ borderBottom: '2px solid', borderBottomColor: colors.accent, display: 'block' }}
            >
                {collection.headerRows.map((headerRow) => (
                    <TableHeaderRow 
                        key={headerRow.key} 
                        item={headerRow} 
                        state={state}
                    >
                        {[...headerRow.childNodes].map(column =>
                            column.props.isSelectionCell
                            ?   <TableSelectAllCell 
                                    key={column.key} 
                                    column={column} 
                                    state={state} 
                                />
                            :   <TableColumnHeader 
                                    key={column.key} 
                                    column={column} 
                                    state={state} 
                                />
                        )}
                    </TableHeaderRow>
                ))}
            </TableRowGroup>

            <TableRowGroup 
                ref={bodyRef} 
                type='tbody' 
                style={{display: 'block', overflow: 'auto'}}
            >
                {[...collection.body.childNodes].map((row) => (
                    <TableRow key={row.key} item={row} state={state}>
                        {[...row.childNodes].map((cell) =>
                            cell.props.isSelectionCell
                            ?   <TableCheckboxCell key={cell.key} cell={cell} state={state} />
                            :   <TableCell key={cell.key}  cell={cell} state={state} />
                        )}
                    </TableRow>
                ))}
            </TableRowGroup>
        </table>
    )
}


const TableRowGroup = React.forwardRef((props: any, ref) => {
    let {type: Element, style, children} = props
    let {rowGroupProps} = useTableRowGroup()

    return (
      <Element ref={ref} {...rowGroupProps} style={style}>
        {children}
      </Element>
    );
});

function TableHeaderRow({ 
    item, 
    state, 
    children 
}: {
    item: GridNode<HTMLTableElement>; 
    state: TableState<HTMLTableElement>;
    children: React.ReactNode; 
} ) {
  let ref: RefObject<HTMLTableRowElement> = useRef<HTMLTableRowElement>(null!)
  let { rowProps } = useTableHeaderRow({ node: item }, state, ref)

  return (
    <tr {...rowProps} ref={ref} 
        style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            gap: 0,
        }}
    >
      {children}
    </tr>
  );
}


const TableColumnHeader = ({ 
    column, 
    state 
}: { 
    column: GridNode<HTMLElement>; 
    state: TableState<HTMLTableElement>; 
}) => {
    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!)
    let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref)
    let {isFocusVisible, focusProps} = useFocusRing()
    let arrowIcon = state.sortDescriptor?.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon /> 

    const colors = useGloballyConsistentColors()

    return (
        <th
            {...mergeProps(columnHeaderProps, focusProps)}
            colSpan={column.colspan}
            style={{
                width: '100%',
                textAlign: column && column.colspan ? (column?.colspan > 1 ? 'center' : 'left') : 'center',
                padding: '5px 10px',
                outline: isFocusVisible ? '2px solid orange' : 'none',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                backgroundColor: colors.neutral,
                color: colors.text
            }}
            ref={ref}
        >
            {column.rendered}
            {column.props.allowsSorting &&
                <span 
                    aria-hidden="true" 
                    style={{
                        padding: '0 2px', 
                        visibility: state.sortDescriptor?.column === column.key ? 'visible' : 'hidden'
                    }}
                >
                    {arrowIcon}
                </span>
            }
        </th>
    );
}

type PointerType = 'mouse' | 'pen' | 'none'
type FocusType = 'hoverstart' | 'hoverend'
type FocusEventType = {
    pointerType: PointerType;
    type: FocusType;
    target: HTMLElement; 
}; 

const TableRow = ({ 
    item, 
    children, 
    state 
}: { 
    item: Node<HTMLTableElement>; 
    state: TableState<HTMLTableElement>;
    children: React.ReactNode; 
}) => {

    const colors = useGloballyConsistentColors()
    const [_pointerType, setPointerType] = useState<PointerType>('none')
    const { isHovered, hoverProps } = useHover({
        onHoverStart: ((event: FocusEventType) => setPointerType(event.pointerType)),
        onHoverEnd: ((_event: FocusEventType) => setPointerType('none'))
    });

    let ref: RefObject<HTMLTableRowElement> = useRef<HTMLTableRowElement>(null!)
    let isSelected = state.selectionManager.isSelected(item.key);
    let {rowProps} = useTableRow({node: item}, state, ref);
    let {isFocusVisible, focusProps} = useFocusRing();

    return (
        <tr
            style={{
                // eslint-disable-next-line no-nested-ternary
                background: isSelected ? colors.accent : isHovered ? 'transparent' : colors.loContrast,
                color: isSelected ? colors.funkyText : isHovered ? colors.funky : colors.text,
                outline: isFocusVisible ? `2px solid ${colors.funky}` : 'none',
            }}
            {...mergeProps(rowProps, focusProps, hoverProps)}
            ref={ref}
        >
            {children}
        </tr>
    );
}

export const TableCell = ({ 
    cell, 
    state 
}: { 
    cell: GridNode<HTMLElement>; 
    state: TableState<HTMLTableElement>;
}) => {

    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!);
    let {gridCellProps} = useTableCell({node: cell}, state, ref);
    let {isFocusVisible, focusProps} = useFocusRing();

    return (
        <td
            {...mergeProps(gridCellProps, focusProps)}
            style={{
                padding: '5px 10px',
                outline: isFocusVisible ? '2px solid orange' : 'none',
                cursor: 'default'
            }}
            ref={ref}
        >
            
            {cell.rendered}
            
        </td>
    );
}

const TableCheckboxCell = ({ 
    cell, 
    state 
}: { 
    cell: Node<HTMLElement>; 
    state: TableState<HTMLTableElement>;
}) => {
    
    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!)
    let { gridCellProps } = useTableCell({ node: cell }, state, ref)
    let { checkboxProps } = useTableSelectionCheckbox({ key: cell?.parentKey || `${Math.random()}` }, state)

    let inputRef = useRef(null)
    let { inputProps } = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef)

    return (
        <td
            ref={ref}
            {...gridCellProps}
            style={{  padding: '3px'  }}
        >
            <Checkbox 
                checked={checked}
                onCheckedChange={onCheckedChange}
                {...inputProps} 
            />
        </td>
    );
}

function TableSelectAllCell({
    column, 
    state
}: { 
    column: GridNode<unknown>; 
    state: TableState<HTMLTableElement>; 
}) {

    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!);
    let isSingleSelectionMode = state.selectionManager.selectionMode === 'single';
    let { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref);

    let inputRef = useRef(null);
    let { checkboxProps } = useTableSelectAllCheckbox(state);
    let { inputProps } = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

  return (
    <th
        {...columnHeaderProps}
        ref={ref}
    >
        {isSingleSelectionMode && 
            <VisuallyHidden>
                {inputProps['aria-label']}
            </VisuallyHidden>
        }

        <input
            {...inputProps}
            ref={inputRef}
            style={{ 
                visibility: isSingleSelectionMode ? 'hidden' : 'visible', 
            }} 
        />
    </th>
  );
}
