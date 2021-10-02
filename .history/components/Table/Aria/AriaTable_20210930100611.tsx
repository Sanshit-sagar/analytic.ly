import React, { useRef, } from 'react'


import {useFocusRing} from '@react-aria/focus';
import {mergeProps} from '@react-aria/utils';

import { useCheckbox } from '@react-aria/checkbox'
import { useToggleState } from '@react-stately/toggle'

import { Box } from '../../../primitives/Box'

import {
    useTable, 
    useTableCell, 
    useTableColumnHeader, 
    useTableRow, 
    useTableHeaderRow, 
    useTableRowGroup, 
    useTableSelectAllCheckbox, 
    useTableSelectionCheckbox
} from '@react-aria/table'

export function TableCheckboxCell({cell, state}) {
    let ref = useRef();
    let {gridCellProps} = useTableCell({node: cell}, state, ref);
    let {checkboxProps} = useTableSelectionCheckbox({key: cell.parentKey}, state);
  
    let inputRef = useRef(null);
    let {inputProps} = useCheckbox(
      checkboxProps,
      useToggleState(checkboxProps),
      inputRef
    );
  
    return (
      <td {...gridCellProps} ref={ref}>
        <input {...inputProps} />
      </td>
    );
}
export function TableSelectAllCell({column, state}) {
    let ref = useRef();
    let isSingleSelectionMode = state.selectionManager.selectionMode === 'single';
    let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);
  
    let {checkboxProps} = useTableSelectAllCheckbox(state);
    let inputRef = useRef(null);
    let {inputProps} = useCheckbox(
      checkboxProps,
      useToggleState(checkboxProps),
      inputRef
    );
  
    return (
      <th {...columnHeaderProps} ref={ref}>
        {state.selectionManager.selectionMode === 'single' ? (
          <VisuallyHidden>{inputProps['aria-label']}</VisuallyHidden>
        ) : (
          <input {...inputProps} ref={inputRef} />
        )}
      </th>
    );
}

export function TableRowGroup({type: Element, style, children}) {
    let {rowGroupProps} = useTableRowGroup();
    return (
      <Element {...rowGroupProps} style={style}>
        {children}
      </Element>
    );
}
export function TableHeaderRow({item, state, children}) {
    let ref = useRef();
    let {rowProps} = useTableHeaderRow({node: item}, state, ref);
  
    return (
      <tr {...rowProps} ref={ref}>
        {children}
      </tr>
    );
}
export function TableColumnHeader({column, state}) {
    let ref = useRef();
    let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);
    let {isFocusVisible, focusProps} = useFocusRing();
    let arrowIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';
  
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
        ref={ref}>
        {column.rendered}
        {column.props.allowsSorting && (
          <span
            aria-hidden="true"
            style={{
              padding: '0 2px',
              visibility:
                state.sortDescriptor?.column === column.key ? 'visible' : 'hidden'
            }}>
            {arrowIcon}
          </span>
        )}
      </th>
    );
}
export function TableRow({item, children, state}) {
    let ref = useRef();
    let isSelected = state.selectionManager.isSelected(item.key);
    let {rowProps} = useTableRow({node: item}, state, ref);
    let {isFocusVisible, focusProps} = useFocusRing();
  
    return (
      <tr
        style={{
          background: isSelected
            ? 'blueviolet'
            : item.index % 2
            ? 'var(--spectrum-alias-highlight-hover)'
            : 'none',
          color: isSelected ? 'white' : null,
          outline: isFocusVisible ? '2px solid orange' : 'none'
        }}
        {...mergeProps(rowProps, focusProps)}
        ref={ref}>
        {children}
      </tr>
    );
}
export function TableCell({cell, state}) {
    let ref = useRef();
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
        ref={ref}>
        {cell.rendered}
      </td>
    );
}


function AriaTable(props) {
    let state = useTableState({
        ...props,
        showSelectionCheckboxes: props.selectionMode === 'multiple'
    });
    let ref = useRef();
    let {collection} = state;
    let {gridProps} = useTable(props, state, ref);
  
    return (
        <Box 
            css={{ 
                backgroundColor: '$loContrast', 
                color: 'transparent', 
                borderColor: '$panel', 
                border: 'thin solid', 
                br: '$2' 
            }}
        >
        <table {...gridProps} ref={ref} style={{borderCollapse: 'collapse'}}>
            <TableRowGroup
                type="thead"
                style={{
                    borderBottom: '2px solid var(--spectrum-global-color-gray-800)'
            }}>
                {collection.headerRows.map((headerRow) => (
                    <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
                        {[...headerRow.childNodes].map((column) =>
                            column.props.isSelectionCell ? (
                            <TableSelectAllCell
                                key={column.key}
                                column={column}
                                state={state}
                            />
                            ) : (
                            <TableColumnHeader
                                key={column.key}
                                column={column}
                                state={state}
                            />
                            )
                        )}
                    </TableHeaderRow>
                ))}
                </TableRowGroup>
                <TableRowGroup type="tbody">
                    {[...collection.body.childNodes].map((row) => (
                        <TableRow key={row.key} item={row} state={state}>
                            {[...row.childNodes].map((cell) =>
                                cell.props.isSelectionCell ? (
                                <TableCheckboxCell key={cell.key} cell={cell} state={state} />
                                ) : (
                                <TableCell key={cell.key} cell={cell} state={state} />
                                )
                            )}
                        </TableRow>
                    ))}
                </TableRowGroup>
            </table>
      </Box>
    );
}

export default AriaTable