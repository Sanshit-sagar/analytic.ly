import React, { useRef } from 'react'

import {
    Cell,
    Column,
    Row,
    TableBody,
    TableHeader,
    useTableState
  } from '@react-stately/table';
  import {mergeProps} from '@react-aria/utils';
  import {useRef} from 'react';
  import {useFocusRing} from '@react-aria/focus';

import { useTableState } from '@react-stately/table';
import  { useTable } from '@react-aria/table'

import { Box } from '../../../primitives/Box'

function TableRowGroup({type: Element, style, children}) {
    let {rowGroupProps} = useTableRowGroup();
    return (
      <Element {...rowGroupProps} style={style}>
        {children}
      </Element>
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