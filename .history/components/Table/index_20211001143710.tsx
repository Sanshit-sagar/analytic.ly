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

type Column = {
    name: string;
    uid: string; 
};

type Pokemon = {
    id: number;
    name: string;
    type: string;
    level: string; 
};


const DataTable: React.FC<{}> = () => {

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
            <TableHeader columns={columns}>
                {(column) => (
                    <Column key={column.name}>
                        {column.name} 
                    </Column>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                    <Row>
                        {(columnKey) => (
                            <
                        )}
                    </Row>
                )}
            </TableBody>
        </Table>
    );
}

export default DataTable










// {/* />   */}