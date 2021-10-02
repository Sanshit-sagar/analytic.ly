
import React from 'react'
import {Table} from './AriaTable'

import {
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader
} from '@react-stately/table'

type ElementType = 'Fire' | 'Water' | 'Flying' | 'Grass' | 'Poison' | 'Electric' 
type ComposedElementType = typeof(`${ElementType}, ${ElementType}`

interface IColumn {
    name: string;
    uid: string; 
}
interface IRow {
    id: number; 
    name: string;
    type: ElementType; 
    level: string; 
}

let columns: IColumn[] = [
    {name: 'Name', uid: 'name'},
    {name: 'Type', uid: 'type'},
    {name: 'Level', uid: 'level'}
  ];
  
  let rows: IRow[] = [
    {id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67'},
    {id: 2, name: 'Blastoise', type: 'Water', level: '56'},
    {id: 3, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
    {id: 4, name: 'Pikachu', type: 'Electric', level: '100'},
    {id: 5, name: 'Charizard', type: 'Fire, Flying', level: '67'},
    {id: 6, name: 'Blastoise', type: 'Water', level: '56'},
    {id: 7, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
    {id: 8, name: 'Pikachu', type: 'Electric', level: '100'},
    {id: 9, name: 'Charizard', type: 'Fire, Flying', level: '67'},
    {id: 10, name: 'Blastoise', type: 'Water', level: '56'},
    {id: 11, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
    {id: 12, name: 'Pikachu', type: 'Electric', level: '100'}
]

const ExampleTable = () => () => (
    <>
        <input 
            aria-label="Focusable before" 
            placeholder="Focusable before" 
        />
        
        <Table 
            aria-label="Table with selection" 
            selectionMode="multiple"
        >
            <TableHeader columns={columns}>
                {column => (
                    <Column key={column.uid}>
                        {column.name}
                    </Column>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {item => (
                    <Row>
                        {columnKey => <Cell>{item[columnKey]}</Cell>}
                    </Row>
                )}
            </TableBody>
        </Table>

        <input 
            aria-label="Focusable after" 
            placeholder="Focusable after" 
        />
    </>
);