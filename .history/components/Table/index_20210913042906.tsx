import React  from 'react'
import {useAsyncList} from '@react-stately/data'
import { useTable, useSortBy } from 'react-table'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { 
    Toolbar, 
    ToolbarToggleItem, 
    ToolbarToggleGroup
} from '../../primitives/Toolbar'

import AriaTable from './Aria/AriaTable'
import { TableSkeleton } from './Skeleton'
import { TableScrollView } from './ScrollView'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { PageSizeSelector } from './ActionGroups/PageSizeSelector'
import { ITableColumn } from './interfaces'

import { 
    ChevronLeftIcon, 
    ChevronRightIcon,
    DoubleArrowLeftIcon, 
    DoubleArrowRightIcon,
    TriangleUpIcon,
    TriangleDownIcon,
    ReloadIcon
} from '@radix-ui/react-icons'

export interface ITable {
    columns: ITableColumn[];
    clicks: any[];
    initializing: boolean;
    loading: boolean;
    refreshing: boolean;
    finishing: boolean;
    noData: boolean;
    error: any | undefined | null;
    pageSize: number;
    pageIndex: number;
    doMutate: boolean;
    reset: () => void;
    mutate: () => void; 
    next: () => void; 
    previous: () => void; 
    end: () => void; 
}

interface IPaginationButtonProps {
    key: number;
    loading: boolean;
    disabled: boolean;
    onClick: () => void;
    value: string;
    icon: any; 
}

interface ISortIconProps {
    isSortedAsc: boolean;
    isSortedDesc: boolean;
}

const PaginationButton = ({ key, loading, disabled, onClick, value, icon }: IPaginationButtonProps) => (
    <ToolbarToggleItem 
        key={key}
        disabled={disabled}
        onClick={onClick}
        value={value} 
    >
        {      loading 
            ? <Text> ... </Text> 
            : icon
        }
    </ToolbarToggleItem>
)

const DataTable = ({ sortDescriptor, onSortChange, keys, items }: { 
    sortDescriptor: { 
        column: string; 
        direction: string; 
    }; 
    onSortChange: () => any[]; 
    keys: string;  
    items: any; 
}) => {

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'flex-end', gap: '$1' }}>
            <Toolbar>
                <ToolbarToggleGroup type='single' defaultValue='next'>
                    {paginationButtons.map((paginator: IPaginationButtonProps) => (
                        <PaginationButton
                            key={paginator.key}
                            value={paginator.value}
                            loading={paginator.loading}
                            disabled={paginator.disabled}
                            onClick={paginator.onClick}
                            icon={paginator.icon}
                        />
                    ))}
                </ToolbarToggleGroup>
                
                <Flex css={{ width: '100%', fd: 'row', jc: 'flex-end', ai: 'stretch', gap: '$1'}}>
                    <PageSizeSelector />
                </Flex>
            </Toolbar>

            <TableScrollView content={
                <AriaTable 
                <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}>
                >
                    {headerGroups.map((headerGroup, _) => (
                        <TableHeader {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any, hgIndex: number) => (
                                <Column 
                                    key={hgIndex} 
                                    isRowHeader
                                    allowsSorting
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')} 
                                </Column> 
                            ))}
                        </TableHeader>
                    ))} 

                    <TableBody {...getTableBodyProps()}> 
                        {rows.map((row, _: number) => {  
                            prepareRow(row) 

                            return (
                                <Row {...row.getRowProps()}>
                                    {row.cells.map((cell, _: number) => {
                                        return (
                                            <Cell {...cell.getCellProps()}>
                                                {cell.render('Cell')} 
                                            </Cell> 
                                        );
                                    })}
                                </Row> 
                            );
                        })} 
                    </TableBody>
                </AriaTable>}
            />
        </Flex> 
    );
}

interface ISortProps  { 
    items: any[] | undefined; 
    sortDescriptor:  { 
        column: string; 
        direction: string; 
    };
};

const DataTableWrapper = ({ 
    columns,
    clicks,
    initializing,
    loading,
    refreshing,
    finishing,
    mutate,
    doMutate,
    reset,
    next,
    previous,
    end,
    pageIndex,
}: ITable) => {

    const mutatePages = () => !doMutate ? null : mutate()
    const firstPage = () => reset()
    const nextPage = () =>  next()
    const previousPage = () =>  previous()
    const lastPage = () => end()

    let list = useAsyncList({
        async load({signal}) {
          let res = await fetch('/api/metrics/user/sanshit.sagar@gmail.com/clickstream', {signal});
          let json = await res.json();
          return {
            items: json.results
          };
        },
        async sort({ items, sortDescriptor}: ISortProps) {
            return {
              items: items.sort((a: any, b: any) => {
                let first = a[sortDescriptor.column];
                let second = b[sortDescriptor.column];
                let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
                if (sortDescriptor.direction === 'descending') {
                  cmp *= -1;
                }
                return cmp;
              })
            };
        }
    });

    const keys = [
                'slug', 'destination', 
                'timestamp', 'clicks', 
                'country', 'location', 'geodata', 
                'ip', 'browser', 
                'engine', 'os', 'tlsVersion', 
                'httpProtocol','tlsCipher', 
                'clientAcceptEncoding'
            ];

    return (
        <DataTable 
            sortDescriptor={list.sortDescriptor} 
            onSortChange={list.sort} 
            keys={keys}
            items={list.items}
        />
    )
}


export default DataTable








// {/* />   */}