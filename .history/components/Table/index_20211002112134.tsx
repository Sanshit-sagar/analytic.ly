import React, { useState }  from 'react'
import { styled } from '../../stitches.config'

import { useAsyncList } from '@react-stately/data';
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { Toolbar } from '../../primitives/Toolbar'

import SelectMenu from '../../compositions/SelectMenu'

import { Table as AriaTable } from './Aria/AriaTable'
import { TableScrollView } from './ScrollView'

import { StarIcon } from '@radix-ui/react-icons'

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

const ControlButton = styled(Button, {
    color: '$accent',
    fontSize: '$2',
    margin: '$1',
    br: '$1',
    border: '1px solid $border', 
    '&:hover': {
        borderColor: '$border3'
    }
})

const Table: React.FC<{}> = (props: any) => {
    const pageSizes = [
        { id: '0', value: 5, textValue: '5 items', alt: undefined, icon: undefined },
        { id: '1', value: 10, textValue: '10 items', alt: undefined, icon: undefined },
        { id: '2', value: 15, textValue: '15 items', alt: undefined, icon: undefined },
        { id: '3', value: 20, textValue: '20 items', alt: undefined, icon: undefined },
        { id: '4', value: 25, textValue: '25 items', alt: undefined, icon: undefined },
        { id: '5', value: 50, textValue: '30 items', alt: undefined, icon: undefined },
    ];


    const [pageSizeIndex, setPageSizeIndex] = useState(3) 
    let email = 'sanshit.sagar@gmail.com'

    const updatePageSize = (updatedIndex: number) => {
        setPageSizeIndex(updatedIndex)
    }
    
    let list = useAsyncList({
        async load({ signal, cursor }) {
            let res = await fetch(`/api/clicks/paginate/${email}/${cursor || '0'}/${pageSizes[pageSizeIndex].value}`, {signal});
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
        { key: 'location',  name: 'Location', sortable: true, width: 125 },
        { key: 'browser',  name: 'Browser', sortable: true, width: 50 },
        { key: 'engine',  name: 'Engine', sortable: true, width: 50 },
        { key: 'os',  name: 'OS', sortable: true, width: 50 },
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
                <ControlButton onClick={list.loadMore}>
                    {list.isLoading ? '...' : 'load more'} 
                </ControlButton> 
                <ControlButton onClick={list.reload}>
                    {list.isLoading ? '...' : 'Reload'}
                </ControlButton>
                <SelectMenu
                    selectOnly={true}
                    group={'pageSizes'}
                    items={pageSizes}
                    selectedIndex={pageSizeIndex}
                    setSelectedIndex={updatePageSize}
                    selectedTextValue={}
                    selectedTextValue={
                        <>
                            <StarIcon />
                            <Text> {`${pageSizes[pageSizeIndex].value}`} </Text> 
                        </>
                    }
                /> 
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