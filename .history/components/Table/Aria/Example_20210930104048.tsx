
import React from 'react'
import {Table} from './AriaTable'

import {
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader
} from '@react-stately/table'


export const ExampleTable = (props) => {
    let columns = [
      {name: 'Name', key: 'name'},
      {name: 'Type', key: 'type'},
      {name: 'Date Modified', key: 'date'}
    ];
  
    let rows = [
      {id: 1, name: 'Games', date: '6/7/2020', type: 'File folder'},
      {id: 2, name: 'Program Files', date: '4/7/2021', type: 'File folder'},
      {id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System file'},
      {id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text Document'}
    ];
  
    return (
      <Table aria-label="Example dynamic collection table" {...props}>
        <TableHeader columns={columns}>
          {(column) => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <Row>
                {(columnKey: 'id' | 'name' | 'date' | 'type') => (
                    <Cell>
                        {item[columnKey]}</Cell>
                )} 
            </Row>
          )}
        </TableBody>
      </Table>
    );
}