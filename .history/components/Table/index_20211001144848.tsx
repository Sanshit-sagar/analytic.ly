import React  from 'react'
import {useAsyncList} from '@react-stately/data';
import { Table } from './Aria/AriaTable'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'


const DataTable: React.FC<{}> = (props: any) => {

    let list = useAsyncList({
        async load({signal}) {
            let res = await fetch(`https://swapi.dev/api/people/?search`, {signal});
            let json = await res.json();
            return {
                items: json.results
            };
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp =(parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1;
                    }
                    return cmp;
                })
            }
        }
    })
  

    return (
       <Box 
       css={{ bc: '$panel', border: '2px solid $border', br: '$2', width: '100%', height: '100%', '&:hover': { borderColor: '$border3'}, }}
        <Table
            aria-label="Example table with client side sorting"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}>
            <TableHeader>
                <Column key="name" allowsSorting>
                    Name
                </Column>
                <Column key="height" allowsSorting>
                    Height
                </Column>
                <Column key="mass" allowsSorting>
                    Mass
                </Column>
                <Column key="birth_year" allowsSorting>
                    Birth Year
                </Column>
            </TableHeader>
            <TableBody items={list.items}>
                {(item) => (
                <Row key={item.name}>
                    {(columnKey) => <Cell>{item[columnKey]}</Cell>}
                </Row>
                )}
            </TableBody>
        </Table>
    );
}

export default DataTable










// {/* />   */}