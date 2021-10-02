
import React from 'react'
import {Table} from './AriaTable'

import {
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader
} from '@react-stately/table'


export const ExampleTable = (props: any) => {
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
        <Table 
            aria-label="Table with selection" 
            selectionMode="multiple"
        >
            <TableHeader>
                <Column>Name</Column>
                <Column>Type</Column>
                <Column>Level</Column>
            </TableHeader>
            <TableBody>
                <Row key="1">
                    <Cell>Charizard</Cell>
                    <Cell>Fire, Flying</Cell>
                    <Cell>67</Cell>
                </Row>
                <Row key="2">
                    <Cell>Blastoise</Cell>
                    <Cell>Water</Cell>
                    <Cell>56</Cell>
                </Row>
                <Row key="3">
                    <Cell>Venusaur</Cell>
                    <Cell>Grass, Poison</Cell>
                    <Cell>83</Cell>
                </Row>
                <Row key="4">
                    <Cell>Pikachu</Cell>
                    <Cell>Electric</Cell>
                    <Cell>100</Cell>
                </Row>
            </TableBody>
        </Table>
    );
}