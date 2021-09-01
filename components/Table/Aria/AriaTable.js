import React, { useRef } from 'react'
import { 
    TableRowGroup, 
    TableHeaderRow, 
    TableSelectAllCell, 
    TableColumnHeader,
    TableCheckboxCell, 
    TableRow,
    TableCell
} from './Primitives'

import { useTableState } from '@react-stately/table';
import  { useTable } from '@react-aria/table'

import { darkModeAtom } from '../../../pages/index' 
import { useAtom } from 'jotai'


function AriaTable(props) {
    let state = useTableState({
      ...props,
      showSelectionCheckboxes: props.selectionMode === 'multiple'
    });
    let ref = useRef();
    let {collection} = state;
    let {gridProps} = useTable(props, state, ref);

    const [darkMode] = useAtom(darkModeAtom)
  
    return (
      <table {...gridProps} ref={ref}>
        <TableRowGroup
          type="thead"
        >
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
                  <TableCheckboxCell 
                    key={cell.key} 
                    cell={cell} 
                    state={state} 
                  />
                ) : (
                  <TableCell 
                    key={cell.key} 
                    cell={cell} 
                    state={state} 
                  />
                )
              )}
            </TableRow>
          ))}
        </TableRowGroup>
      </table>
    );
  }

export default AriaTable