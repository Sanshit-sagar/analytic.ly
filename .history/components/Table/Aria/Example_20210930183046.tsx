
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
type ColKeyType = 'id' | 'name' | 'date' | 'type';

interface IRow {
    id: number; 
    name: string;
    date: string; 
    type: string;
};

export const ExampleTable = ({ columns, rows, tableProps, selectionType }: {
    columns: { name: string; key: string; }[],
    rows: IRow[],
    tableProps: any[]; 
    selectionType: SelectionType;
}) => {
   
    // let [selectedKeys, setSelectedKeys] = React.useState(new Set([2]));
   
    return (
        <Table aria-label="Table with controlled selection" {...tableProps}>
            <TableHeader columns={columns}>
                <Column key="name" allowsSorting>
                    ID
                </Column>
                <Column key="height" allowsSorting>
                    Name
                </Column>
                <Column key="mass" allowsSorting>
                    Mass
                </Column>
            </TableHeader>
            <TableBody items={rows}>
                <> {(item: IRow, i: number) => (
                    <Row key={`row-${i}`}> 
                       <> {(columnKey: ColKeyType, j: number) => (
                            <Cell key={`cell-${j}`}> 
                                {item[columnKey]} 
                            </Cell>
                        )} </>
                    </Row>
                )} </>
            </TableBody>
        </Table>
    );
}