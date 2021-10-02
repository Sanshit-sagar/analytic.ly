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

import { mergeProps } from '@react-aria/utils'
import { useFocusRing } from '@react-aria/focus'
import { useCheckbox } from '@react-aria/checkbox'
import { useHover } from '@react-aria/interactions'

import { useTableState, TableState } from '@react-stately/table'
import { useToggleState } from '@react-stately/toggle'
import { VisuallyHidden } from '@react-aria/visually-hidden'

import { Text } from '../../../primitives/Text'
import { useGloballyConsistentColors } from '../../../hooks/useColors'
import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons'

import { TableProps, TableRowProps, } from './interfaces'



export const Table = (props: TableProps<T>) => {
    let ref: RefObject<HTMLTableElement> = useRef<HTMLTableElement>(null!)
    let state: TableState<HTMLTableElement>  = useTableState({ 
        ...props, 
        showSelectionCheckboxes: props.selectionMode === 'multiple' 
    })
   

    let bodyRef: RefObject<HTMLElement> = useRef<HTMLElement>(null!)
    let { collection } = state
    let { gridProps } = useTable({ ...props, scrollRef: bodyRef }, state, ref)

    return (
        <table 
            ref={ref} 
            {...gridProps} 
            style={{ borderCollapse: 'collapse' }}
        >
            <TableRowGroup 
                type='thead'
                style={{ borderBottom: '2px solid gray', display: 'block' }}
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
                style={{display: 'block', overflow: 'auto', maxHeight: '200px'}}
            >
                {[...collection.body.childNodes].map((row) => (
                    <TableRow 
                        key={row.key} 
                        item={row} 
                        state={state}
                    >
                        {[...row.childNodes].map((cell) =>
                            cell.props.isSelectionCell
                            ?   <TableCheckboxCell 
                                    key={cell.key} 
                                    cell={cell} 
                                    state={state} 
                                />
                            :   <TableCell 
                                    key={cell.key} 
                                    cell={cell} 
                                    state={state} 
                                />
                        )}
                    </TableRow>
                ))}
            </TableRowGroup>
        </table>
    )
}

const TableRowGroup = React.forwardRef((props: TableRowProps, ref: RefObject<HTMLElement>) => {
  let { type: Element, style, children } = props
  let { rowGroupProps } = useTableRowGroup()

  return (
    <Element 
        ref={ref} 
        style={style}
        {...rowGroupProps} 
    >
        {children}
    </Element>
  )
})

function TableHeaderRow({ 
    item, 
    state, 
    children 
}: {
    item: TableRowProps<T>;
    state: TableState<T>;
    children: React.ReactNode; 
} ) {
  let ref: RefObject<HTMLTableRowElement> = useRef<HTMLTableRowElement>(null!)
  let { rowProps } = useTableHeaderRow({ node: item }, state, ref)

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
}

const AscIcon = () => <TriangleUpIcon />;
const DescIcon = () => <TriangleDownIcon />;

const TableColumnHeader = ({
    column, 
    state 
}: { 
    column: ColumnHeaderProps; 
    state: TableState; 
}): ColumnHeaderAria => {

    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!)
    let { columnHeaderProps } = useTableColumnHeader({node: column}, state, ref)

    let { isFocusVisible, focusProps } = useFocusRing()
    let arrowIcon = state.sortDescriptor?.direction === 'ascending' ? <AscIcon /> : <DescIcon /> 

  return (
    <th
        {...mergeProps(columnHeaderProps, focusProps)}
        colSpan={column.colspan}
        style={{
            textAlign: column.colspan > 1 ? 'center' : 'left',
            padding: '5px 10px',
            outline: isFocusVisible ? '2px solid orange' : 'none',
            cursor: 'default'
        }}
        ref={ref}
    >
        <Text size='1' css={{ color: '$funkyText' }}> {column.rendered} </Text> 
        
        {column.props.allowsSorting &&
            <span 
                aria-hidden="true" 
                style={{ padding: '0 2px', visibility: state.sortDescriptor?.column === column.key ? 'visible' : 'hidden' }}
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
    item: GridRowProps<T>; 
    state: TableState<T>; 
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
                background: isSelected ? colors.funkyText : isHovered ? colors.accentHover : 'transparent',
                color: isSelected ? colors.text : isHovered ? colors.loContrast : colors.text,
                outline: isFocusVisible ? `2px solid ${colors.funky}` : 'none'
            }}
            {...mergeProps(rowProps, focusProps, hoverProps)}
            ref={ref}
        >
            {children}
        </tr>
    );
}

function TableCell({ cell, state }) {
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
            <Text size='1'>
                {cell.rendered}
            </Text>
        </td>
    );
}

function TableCheckboxCell({ cell, state }) {
    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!)
    let { gridCellProps } = useTableCell({ node: cell }, state, ref)
    let { checkboxProps } = useTableSelectionCheckbox({ key: cell.parentKey }, state)

    let inputRef = useRef(null)
    let { inputProps } = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef)

    return (
        <td
            ref={ref}
            {...gridCellProps}
        >
            <input 
                {...inputProps} 
                style={{ backgroundColor: 'transparent' }} 
            />
        </td>
    );
}

function TableSelectAllCell({column, state}: { column: ; state: TableSelectState; }) {

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
      {isSingleSelectionMode && <VisuallyHidden>{inputProps['aria-label']}</VisuallyHidden>}
      <input
        {...inputProps}
        ref={inputRef}
        style={isSingleSelectionMode ? {visibility: 'hidden'} : undefined} />
    </th>
  );
}
