import React  from 'react'

import { useTable, useSortBy } from 'react-table'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { 
    Toolbar, 
    ToolbarToggleItem, 
    ToolbarToggleGroup
} from '../../primitives/Toolbar'

import { Table } from './Aria/AriaTable'
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

const DataTable = ({ 
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
    
    const mutatePages = () => mutate()
    const firstPage = () => reset()
    const nextPage = () =>  next()
    const previousPage = () =>  previous()
    const lastPage = () => end()

    if(initializing) return <TableSkeleton />

    let atEarliest = pageIndex <= 1
    let atLatest = finishing
    const data = clicks?.length ? [...clicks] : []

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow
    } = useTable({ columns, data }, useSortBy);

    const paginationButtons = [
        { key: 0, value: 'first', loading: loading, disabled: loading || atEarliest, onClick: firstPage, icon: <DoubleArrowLeftIcon /> },
        { key: 1, value: 'prev', loading: loading, disabled: loading || atEarliest, onClick: previousPage, icon: <ChevronLeftIcon /> },
        { key: 2, value: 'next', loading: loading, disabled: loading || atLatest, onClick: nextPage, icon: <ChevronRightIcon /> },
        { key: 3, value: 'last', loading: loading, disabled: loading || atLatest, onClick: lastPage, icon: <DoubleArrowRightIcon /> },
        { key: 4, value: 'refresh', loading: refreshing, disabled: refreshing || !doMutate, onClick: mutatePages, icon: <ReloadIcon /> }
    ];

    return (
        <>
        <input aria-label="Focusable before" placeholder="Focusable before" />
        <Table aria-label="Table with selection" selectionMode="multiple">
          <TableHeader columns={columns}>
            {column => (
              <Column key={column.uid}>
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {item => (
              <Row>
                {columnKey => <Cell>{item[columnKey]}</Cell>}
              </Row>
            )}
          </TableBody>
        </Table>
        <input aria-label="Focusable after" placeholder="Focusable after" />
      </>
    );
}

export default DataTable










// {/* />   */}