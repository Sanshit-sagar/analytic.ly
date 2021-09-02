import React, { useContext, useRef } from 'react'
import {useFocusRing} from '@react-aria/focus'; 
import {mergeProps} from '@react-aria/utils';
import {
    useTableCell, 
    useTableColumnHeader, 
    useTableHeaderRow, 
    useTableRowGroup, 
    useTableRow, 
    useTableSelectAllCheckbox, 
    useTableSelectionCheckbox
} from '@react-aria/table'

import {useToggleState} from '@react-stately/toggle';
import {useCheckbox} from '@react-aria/checkbox';

import { Box } from '../../../primitives/Box'
import { Th, Tr, Td } from '../../../primitives/Table'

import { darkModeAtom } from '../../../pages/index' 
import { useAtom } from 'jotai'


export function TableRowGroup({type: Element, style, children}) {
  let {rowGroupProps} = useTableRowGroup();
  return (
    <Element {...rowGroupProps}>
      {children}
    </Element>
  );
}


export function TableHeaderRow({item, state, children}) {
  let ref = useRef();
  let {rowProps} = useTableHeaderRow({node: item}, state, ref);

  return (
    <Tr {...rowProps} ref={ref}>
        {children}
    </Tr>
  );
}

export function TableColumnHeader({column, state}) {
  let ref = useRef();
  let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  let arrowIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';
  
  const [darkMode] = useAtom(darkModeAtom)

  return (
    <Th
        {...mergeProps(columnHeaderProps, focusProps)}
        colSpan={column.colspan}
        ref={ref}
    >
        {column.rendered}
        {column.props.allowsSorting && (
            <span 
                style={{ 
                    visibility: state.sortDescriptor?.column === column.key ? 'visible' : 'hidden'
                }}
            >
                {arrowIcon}
            </span>
        )}
    </Th>
  );
}

export function TableRow({item, children, state}) {
  let ref = useRef();
  let isSelected = state.selectionManager.isSelected(item.key);
  let {rowProps} = useTableRow({node: item}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  const [darkMode] = useAtom(darkModeAtom)

  return (
    <Tr
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </Tr>
  );
}

export function TableCell({cell, state}) {
  let ref = useRef();
  let {gridCellProps} = useTableCell({node: cell}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  const [darkMode] = useAtom(darkModeAtom)

  return (
    <Td
      {...mergeProps(gridCellProps, focusProps)}
      style={{
        padding: '5px 10px',
        margin: 0,
        outline: 'none',
        border: 'none'
      }}
      ref={ref}
    >
      {cell.rendered}
    </Td>
  );
}

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
    <Td {...gridCellProps} ref={ref}>
      <input {...inputProps} />
    </Td>
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
      {
        isSingleSelectionMode && (
          <VisuallyHidden>{inputProps['aria-label']}</VisuallyHidden>
        )
      }
      <input
        {...inputProps}
        ref={inputRef}
        style={isSingleSelectionMode ? {visibility: 'hidden'} : undefined}
      />
    </th>
  );
}
