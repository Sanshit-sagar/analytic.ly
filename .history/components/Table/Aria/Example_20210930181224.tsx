
import React from 'react'
import {Table} from './AriaTable'

import {
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader
} from '@react-stately/table'


export const ExampleTable = () => {
    let columns = [
        {name: 'Expiry', key: 'name'},
        {name: 'Security', key: 'type'},
        {name: 'Updated', key: 'date'}
      ];
    
    let rows = [
        {id: 1, name: 'Games', date: '6/7/2020', type: 'File'},
        {id: 2, name: 'Program', date: '4/7/2021', type: 'File'},
        {id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System'},
        {id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text'}
    ];
    
    let [selectedKeys, setSelectedKeys] = React.useState(new Set([2]));
   
    return (
        <Table 
            aria-label="Table with controlled selection"
            {...props}
        >
            <TableHeader columns={columns}>
                {(column) => <Column>{column.name}</Column>}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
            </TableBody>
        </Table>
    );
}