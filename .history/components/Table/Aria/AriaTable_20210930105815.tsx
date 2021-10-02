import React, { useRef, RefObject } from 'react'
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

import { useTableState } from '@react-stately/table'
import { useToggleState } from '@react-stately/toggle'
import { VisuallyHidden } from '@react-aria/visually-hidden'

import { Text } from '../../../primitives/Text'
import { useGloballyConsistentColors } from '../../../hooks/useColors'

export function Table(props) {
    let state = useTableState({ ...props, showSelectionCheckboxes: props.selectionMode === 'multiple' });
    let ref: RefObject<HTMLTableElement> = useRef<HTMLTableElement>(null!)

    let bodyRef = useRef();
    let { collection } = state;
    let { gridProps } = useTable({ ...props, scrollRef: bodyRef }, state, ref);

  return (
    <table {...gridProps} ref={ref} style={{borderCollapse: 'collapse'}}>
      <TableRowGroup type="thead" style={{borderBottom: '2px solid gray', display: 'block'}}>
        {collection.headerRows.map(headerRow => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map(column =>
              column.props.isSelectionCell
                ? <TableSelectAllCell key={column.key} column={column} state={state} />
                : <TableColumnHeader key={column.key} column={column} state={state} />
            )}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup ref={bodyRef} type="tbody" style={{display: 'block', overflow: 'auto', maxHeight: '200px'}}>
        {[...collection.body.childNodes].map(row => (
          <TableRow key={row.key} item={row} state={state}>
            {[...row.childNodes].map(cell =>
              cell.props.isSelectionCell
                ? <TableCheckboxCell key={cell.key} cell={cell} state={state} />
                : <TableCell key={cell.key} cell={cell} state={state} />
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
}

const TableRowGroup = React.forwardRef((props: any, ref) => {
  let {type: Element, style, children} = props;
  let {rowGroupProps} = useTableRowGroup();
  return (
    <Element ref={ref} {...rowGroupProps} style={style}>
      {children}
    </Element>
  );
});

function TableHeaderRow({item, state, children}) {
  let ref: RefObject<HTMLElement> = useRef<HTMLElement>(null!);
  let {rowProps} = useTableHeaderRow({node: item}, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
}

function TableColumnHeader({column, state}) {
    let ref: RefObject<HTMLElement> = useRef<HTMLElement>(null!);
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
        ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting &&
        <span aria-hidden="true" style={{padding: '0 2px', visibility: state.sortDescriptor?.column === column.key ? 'visible' : 'hidden'}}>
          {arrowIcon}
        </span>
      }
    </th>
  );
}

function TableRow({item, children, state}) {
    const colors = useGloballyConsistentColors()

    let ref: RefObject<HTMLElement> = useRef<HTMLElement>(null!)
    let isSelected = state.selectionManager.isSelected(item.key);
    let {rowProps} = useTableRow({node: item}, state, ref);
    let {isFocusVisible, focusProps} = useFocusRing();

    return (
        <tr
            style={{
                // eslint-disable-next-line no-nested-ternary
                background: isSelected ? 'blueviolet' : 'transparent',
                color: isSelected ? 'white' : colors.text,
                outline: isFocusVisible ? '2px solid orange' : 'none'
            }}
            {...mergeProps(rowProps, focusProps)}
            ref={ref}
        >
            {children}
        </tr>
    );
}

function TableCell({cell, state}) {
    let ref: RefObject<HTMLElement> = useRef<HTMLElement>(null!);
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

function TableCheckboxCell({cell, state}) {
    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!)
    let {gridCellProps} = useTableCell({node: cell}, state, ref)
    let {checkboxProps} = useTableSelectionCheckbox({key: cell.parentKey}, state)

    let inputRef = useRef(null)
    let {inputProps} = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef)

    return (
        <td
            {...gridCellProps}
            ref={ref}
        >
            <input {...inputProps} />
        </td>
    );
}

function TableSelectAllCell({column, state}) {

    let ref: RefObject<HTMLTableCellElement> = useRef<HTMLTableCellElement>(null!);
    let isSingleSelectionMode = state.selectionManager.selectionMode === 'single';
    let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);

    let inputRef = useRef(null);
    let {checkboxProps} = useTableSelectAllCheckbox(state);
    let {inputProps} = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

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


/*
    In single selection mode, the checkbox will be hidden.
    So to avoid leaving a column header with no accessible content,
    use a VisuallyHidden component to include the aria-label from the checkbox,
    which for single selection will be "Select."
*/