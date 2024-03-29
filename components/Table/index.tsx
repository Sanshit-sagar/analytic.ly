import React, { useState }  from 'react'
import { styled } from '../../stitches.config'

import { useAsyncList } from '@react-stately/data';

import { 
    UpdateIcon,
    TrackNextIcon, 
    DropdownMenuIcon, 
    DotsHorizontalIcon
} from '@radix-ui/react-icons'

import { 
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader 
} from '@react-stately/table'

import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { Toolbar } from '../../primitives/Toolbar'

import SelectMenu from '../../compositions/SelectMenu'

import { Table as AriaTable } from './Aria/AriaTable'
import { TableScrollView } from './ScrollView'
import { 
    pageSizes, 
    headers 
} from './constants'

import { TableProps } from './interfaces'

interface Item {
    id: string;
    slug: string;
    destination: string;
    timestamp: string;
    country: string;
    location: string;
    browser: string;
    engine: string;
    os: string;
    tlsVersion: string;
    httpProtocol: string;
    geodata: string;
    ip: string;
    tlsCipher: string;
};

type StronglyKeyedMap<T, K extends keyof T, V> = { [k in K]: V }
type ItemSKM = StronglyKeyedMap<Item, keyof Item, Key>;

const TableContainer = styled('div', {
    width: '100%', 
    height: '100%', 
    padding: 0,
    margin: 0,
    bc: '$loContrast', 
    border: '2px solid $border', 
    br: '$2', 
    '&:hover': { 
        borderColor: '$border3'
    }, 
});

const HeaderText = styled(Text, { 
    color: 'black',
    display: 'inline-flex', 
    jc: 'flex-start', 
    ai: 'center',
    fontSize: '$3'
});

const TableControls = styled(Toolbar, {
    width: '100%', 
    height: 30, 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-end', 
    ai: 'center', 
    gap: '$1',
    pr: '$2',
    mt: '$1',
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
});

const PageSizeSelector = styled('div', {
    width: '100%', 
    display: 'flex',
    fd:'row', 
    jc: 'space-between', 
    ai: 'center'
});

type SortDirection =  'ascending' | 'descending';

export interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
};

const Table: React.FC<TableProps<Item>> = (_props: TableProps<Item>) => {
   
    const [pageSizeIndex, setPageSizeIndex] = useState(4) 
    let email = 'sanshit.sagar@gmail.com'

    const updatePageSize = (updatedIndex: number) => {
        setPageSizeIndex(updatedIndex)
        list.reload() 
    }
    
    let list = useAsyncList<Item, string>({
        async load({ signal, cursor }) {
            let pageCount = pageSizes[pageSizeIndex].value
            let paginatedEndpoint = `/api/clicks/paginate/${email}/${cursor || '0'}/${pageCount}`
            let res = await fetch(paginatedEndpoint, {signal});
            let json: { data: Item[] } = await res.json();
            return {
                items: json.data,
                cursor: `${parseInt(`${cursor}`) + 1}`
            };
        },
        async sort({ items, sortDescriptor }) {
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
    });
  

    let rows = list && list?.items.map((item: Item[], index: number) => {
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
            ip: item['ip']
        }
    })

    if(!rows || !rows?.length) return null; 

    return (
        <TableContainer>
            <TableControls aria-label='Table Controls'>
                <ControlButton onClick={list.loadMore}>
                    {list.isLoading 
                        ?   <DotsHorizontalIcon /> 
                        :   <TrackNextIcon />
                    }
                </ControlButton> 
                <ControlButton onClick={list.reload}>
                    {list.isLoading 
                        ? <DotsHorizontalIcon />  
                        : <UpdateIcon />
                    }
                </ControlButton>
                <SelectMenu
                    selectOnly={true}
                    group={'pageSizes'}
                    items={pageSizes}
                    selectedIndex={pageSizeIndex}
                    setSelectedIndex={updatePageSize}
                    selectedValue={`${pageSizes[pageSizeIndex].value}`}
                    selectedTextValue={
                        <PageSizeSelector>
                            <DropdownMenuIcon />
                            <Text> {`${pageSizes[pageSizeIndex].value}`} </Text> 
                        </PageSizeSelector>
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
                                    <HeaderText css={{ width: header.width, color: '$funky', fontWeight: 400 }}>
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