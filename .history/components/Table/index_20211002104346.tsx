import React  from 'react'
import { styled } from '../../stitches.config'

import { useAsyncList } from '@react-stately/data';
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { Table as AriaTable } from './Aria/AriaTable'
import { TableScrollView } from './ScrollView'

import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { Toolbar } from '../../primitives/Toolbar'

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

const HeaderText = styled(Text, { 
    color: '$funkyText',
    display: 'inline-flex', 
    jc: 'flex-start', 
    ai: 'center',
    fontSize: '$3'
});

const TableControls = styled(Toolbar, {
    width: '1050px', 
    height: 30, 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-end', 
    ai: 'center', 
    gap: '$1',
    mb: '$2',
    boxShadow: 'none',
    border: 'none',
    bc: 'transparent'
}); 

const Table: React.FC<{}> = (props: any) => {
    const [pageSize, setPageSize] = React.useState(15) 
    let email = 'sanshit.sagar@gmail.com'

    const updatePageSize = (updatedSize: number) => {
        setPageSize(updatedSize)
    }
    
    let list = useAsyncList({
        async load({ signal, cursor }) {
            let res = await fetch(`/api/clicks/paginate/${email}/${cursor || '0'}/${pageSize}`, {signal});
            let json = await res.json();
            return {
                items: json.data,
                cursor: `${parseInt(`${cursor}`) + 1}`
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
        { key: 'id', name: '', sortable: true, width: 0 },
        { key: 'slug', name: 'Slug', sortable: true, width: 205 },
        { key: 'destination', name: 'Destination', sortable: true, width: 150 },
        { key: 'timestamp', name: 'Timestamp', sortable: true, width: 50 }, 
        { key: 'country',  name: '', sortable: true, width: 20 },
        { key: 'location',  name: 'Location', sortable: true, width: 150 },
        { key: 'browser',  name: 'Browser', sortable: true, width: 100 },
        { key: 'engine',  name: 'Engine', sortable: true, width: 100 },
        { key: 'os',  name: 'OS', sortable: true, width: 100 },
        { key: 'tlsVersion',  name: 'TLS v.', sortable: true, width: 100 },
        { key: 'httpProtocol',  name: 'HTTP', sortable: true, width: 100 },
        { key: 'geodata',  name: 'Geodata', sortable: true, width: 100 },
        { key: 'ip',  name: 'IP', sortable: true, width: 100 },
        { key: 'tlsCipher',  name: 'Cipher', sortable: true, width: 100 },

    ]
    // width: headers[index]?.width || 100,
    if(!list || !list?.items) return null; 

    let rows = list && list?.items.map((item, index) => {
        return {
            id: index,
            slug: item['slug'],
            destination: item['destination'],
            timestamp: item['timestamp']['localeTime'],
            country: item['country'],
            location: item['location'],
            browser: item.browser,
            engine: item['engine'],
            os: item['os'],
            tlsVersion: item['tlsVersion'],
            httpProtocol: item['httpProtocol'],
            geodata: item.geodata,
            ip: item['ip'],
            tlsCipher: item['tlsCipher'],
        }
    });

    return (
        <TableContainer>
            <TableControls aria-label='Table Controls'>
                <Button onClick={list.loadMore} css={{ color: '$accent'}}> 
                    <Text size='2' css={{ color: '$text'}}>
                        {list.isLoading ? '...' : 'load more'} 
                    </Text> 
                </Button> 
            </TableControls>

            <TableScrollView 
                content={
                    <AriaTable
                        aria-label="Example table with client side sorting"
                        sortDescriptor={list.sortDescriptor}
                        onSortChange={list.sort}
                        selectionMode={'multiple'}
                    >
                        <TableHeader>
                            {headers.map((header, _index: number) => (
                                <Column 
                                    key={header.key} 
                                    allowsSorting={header.sortable}
                                    isRowHeader={true}
                                >
                                    <HeaderText css={{ width: header.width }}>
                                        {header.name.toUpperCase()} 
                                    </HeaderText>
                                </Column> 
                            ))}
                        </TableHeader>

                        <TableBody items={rows}>
                            {(item) => (
                                <Row key={item.id}>
                                    {(columnKey) => (
                                        <Cell>
                                            <Text size='2' css={{ color: 'inherit' }}> 
                                                {item[columnKey]} 
                                            </Text> 
                                        </Cell>
                                    )}
                                </Row>
                            )}
                        </TableBody>
                    </AriaTable>
                }
            />            
        </TableContainer> 
      
    );
}

export default Table










// {/* />   */}