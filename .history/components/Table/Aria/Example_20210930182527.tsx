
import React from 'react'
import {Table} from './AriaTable'

import {
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader
} from '@react-stately/table'

type SelectionType = 'single' | 'multiple' | 'none'; 

export const ExampleTable = ({ columns, rows, tableProps, selectionType }: {
    columns: { name: string; key: string; }[],
    rows: { id: number; name: string; date: string; type: string; }[],
    tableProps: any[]; 
    selectionType: SelectionType;
}) => {
   
    // let [selectedKeys, setSelectedKeys] = React.useState(new Set([2]));
   
    return (
        <Table aria-label="Table with controlled selection" {...tableProps}>
            <TableHeader columns={columns}>
                {(column) => (
                    <Column>{column.name}</Column>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                   
                    <Row> {(columnKey) => (
                        <Cell> {item[columnKey]} </Cell>
                    )} </Row>
                )}
            </TableBody>
        </Table>
    );
}