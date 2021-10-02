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
        { key: 'slug', name: 'Slug', sortable: true  },
        { key: 'destination', name: 'Destination', sortable: true  },
        { key: 'timestamp', name: 'Timestamp', sortable: true }, 
        { key: 'clicks',  name: 'Clicks', sortable: true },
        { key: 'country',  name: 'Country', sortable: true },
        { key: 'location',  name: 'Location', sortable: true },
    ]

    if(!list || !list?.items) return null; 
    return <Text> {JSON.stringify(list?.items[0])} </Text>

    // return (
    //    <TableContainer>
    //         <Table
    //             aria-label="Example table with client side sorting"
    //             sortDescriptor={list.sortDescriptor}
    //             onSortChange={list.sort}
    //         >
    //             <TableHeader>
    //                 {headers.map((header, _index: number) => (
    //                     <Column 
    //                         key={header.key} 
    //                         allowsSorting={header.sortable}
    //                     >
    //                         <Text size='2' css={{ color: '$funky'}}>
    //                             {header.name} 
    //                         </Text>
    //                     </Column> 
    //                 ))}
    //             </TableHeader>

    //             <TableBody items={list.items}>
    //                 {(item) => (
    //                     <Row key={item.name}>
    //                         {(columnKey) => (
    //                             <Cell>
    //                                 <Text size='1'> 
    //                                     {item[columnKey]} 
    //                                 </Text> 
    //                             </Cell>
    //                         )}
    //                     </Row>
    //                 )}
    //             </TableBody>
    //         </Table>
    //     </TableContainer> 
    // );
}

export default DataTable










// {/* />   */}