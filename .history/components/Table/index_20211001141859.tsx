import React  from 'react'

// import { Text } from '../../primitives/Text'
// import { Flex } from '../../primitives/Flex'

// import { 
//     Toolbar, 
//     ToolbarToggleItem, 
//     ToolbarToggleGroup
// } from '../../primitives/Toolbar'
// import { TableSkeleton } from './Skeleton'
// import { TableScro llView } from './ScrollView'

import { Table } from './Aria/AriaTable'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

type ColumnKeyType = 'id' | 'name' | 'type' | 'level'
type ColumnValueType = 'string' | 'number'

const ColumnTypeMap: { [key: ColumnKeyType]: ColumnValueType } = {
    'id': 'number';
    'name': 'strng';
    'type': 'string';
    'level': 'string';''
}

interface Column {
    name: string;
    uid: ColumnKey;
}
interface Row {
    id: number;
    name: string;
    type: string; 
    level: string; 
}


const DataTable: React.FC<{}> = () => {

    let columns = [
        {name: 'Name', uid: 'name'},
        {name: 'Type', uid: 'type'},
        {name: 'Level', uid: 'level'}
    ];
    
    let rows = [
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
    ];
  

    return (
       
        <Table 
            aria-label="Table with selection" 
            selectionMode="multiple"
        >
            <TableHeader columns={columns}>
                {(column) => (
                <Column key={column.uid}> {column.name} </Column>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                    <Row>
                        {(columnKey) => (
                            <Cell>{item[columnKey]}</Cell>
                        )}
                    </Row>
                )}
            </TableBody>
        </Table>
    );
}

export default DataTable










// {/* />   */}