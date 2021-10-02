import React  from 'react'
import { styled } from '../../stitches.config'

import {useAsyncList} from '@react-stately/data';
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { Table } from './Aria/AriaTable'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'

import { useUser } from '@clerk/nextjs'

const TableContainer = styled('div', {
    width: '100%', 
    height: '100%', 
    padding: '$1', 
    margin: 0,
    bc: '$loContrast', 
    border: '2px solid $border', 
    br: '$2', 
    '&:hover': { 
        borderColor: '$border3'
    }, 
});

const DataTable: React.FC<{}> = (props: any) => {
    
    let list = useAsyncList({
        async load({signal}) {
            let res = await fetch(`/api/clicks/paginate/${email}/${cursor}/${pageSize}`, {signal});
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
  
    let headers = [
        { key: 'name', name: 'Name', sortable: true  },
        { key: 'height', name: 'Height', sortable: true  },
        { key: 'mass', name: 'Mass', sortable: true }, 
        { key: 'birth_year',  name: 'Birth Year', sortable: true }
    ]

    return (
       <TableContainer>
            <Table
                aria-label="Example table with client side sorting"
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
            >
                <TableHeader>
                    {headers.map((header, headerIndex: number) => (
                        <Column 
                            key={header.key} 
                            allowsSorting={header.sortable}
                        >
                            <Text size='2' css={{ color: '$funky'}}>
                                {header.name} 
                            </Text>
                        </Column> 
                    ))}
                </TableHeader>

                <TableBody items={list.items}>
                    {(item) => (
                        <Row key={item.name}>
                            {(columnKey) => (
                                <Cell>
                                    <Text size='1'> 
                                        {item[columnKey]} 
                                    </Text> 
                                </Cell>
                            )}
                        </Row>
                    )}
                </TableBody>
            </Table>
        </TableContainer> 
    );
}

export default DataTable










// {/* />   */}