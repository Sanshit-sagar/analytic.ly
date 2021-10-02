import React  from 'react'
import { styled } from '../../stitches.config'

import {useAsyncList} from '@react-stately/data';
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { Table } from './Aria/AriaTable'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'

// import { useUser } from '@clerk/nextjs'

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
    let email = 'sanshit.sagar@gmail.com'
    let cursor = 0
    let pageSize = 10

    let list = useAsyncList({
        async load({signal}) {
            let res = await fetch(`/api/clicks/paginate/${email}/${cursor}/${pageSize}`, {signal});
            let json = await res.json();
            return {
                items: json.data
            };
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items && items.sort((a, b) => {
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
        { key: 'id', name: 'Serial No.', sortable: true, width: 20 },
        { key: 'slug', name: 'Slug', sortable: true, width: 100 },
        { key: 'destination', name: 'Destination', sortable: true, width: 150 },
        { key: 'timestamp', name: 'Timestamp', sortable: true, width: 100 }, 
        { key: 'clicks',  name: 'Clicks', sortable: true, width: 100 },
        { key: 'country',  name: 'Country', sortable: true, width: 100 },
        { key: 'location',  name: 'Location', sortable: true, width: 100 },
    ]

    if(!list || !list?.items) return null; 

    let rows = list && list?.items.map((item, index) => {
        return {
            id: index,
            slug: item['slug'],
            destination: item['destination'],
            timestamp: item['timestamp']['localeTime'],
            clicks: item['clicks'],
            country: item['country'],
            location: item['location']
        }
    })

    // return <Text> {JSON.stringify(rows)} </Text>

    return (
       <TableContainer>
            <Table
                aria-label="Example table with client side sorting"
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
            >
                <TableHeader>
                    {headers.map((header, _index: number) => (
                        <Column 
                            key={header.key} 
                            allowsSorting={header.sortable}
                        >
                            <Text size='2' css={{ width: header.width, color: '$funkyText'}}>
                                {header.name} 
                            </Text>
                        </Column> 
                    ))}
                </TableHeader>

                <TableBody items={rows}>
                    {(item) => (
                        <Row key={item.id}>
                            {(columnKey) => (
                                <Cell>
                                    <Text size='1' css={{ width: headers[item.id].width, text: '$text'}}> 
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