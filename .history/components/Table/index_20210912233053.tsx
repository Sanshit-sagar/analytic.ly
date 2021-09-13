import React  from 'react'

import { useTable } from 'react-table'

import { Flex } from '../../primitives/Flex'

import { 
    Toolbar, 
    ToolbarButtonGroup, 
    ToolbarButton 
} from '../../primitives/Toolbar'

import AriaTable from './Aria/AriaTable'
import { TableSkeleton } from './Skeleton'
import { TableScrollView } from './ScrollView'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { ITableColumn } from './interfaces'


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
    pageSize
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
    } = useTable({ columns, data })
    
    let selectedKeys = []
    const setSelectedKeys = (newKey: string) => selectedKeys.append(newKey)

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Toolbar>
                <ToolbarButtonGroup>
                    <ToolbarButton 
                        disabled={loading || atEarliest}
                        onClick={firstPage}
                    >
                        {loading ? '...' :  '<<'}
                    </ToolbarButton>
                    <ToolbarButton
                        disabled={loading || atEarliest}
                        onClick={previousPage}
                    >
                        {loading ? '...' : '<'}
                    </ToolbarButton> 
                    <ToolbarButton 
                        disabled={loading || atLatest}
                        onClick={nextPage}
                    >
                        {loading ? "..." : ">"}
                    </ToolbarButton>
                    <ToolbarButton
                        disabled={loading || atLatest}
                        onClick={lastPage}
                    >
                        {loading ? "..." : ">>"}
                    </ToolbarButton>
                    <ToolbarButton
                        disabled={refreshing || !doMutate} 
                        onClick={mutatePages}
                    >
                        {refreshing ? "..." : "refresh"}
                    </ToolbarButtonGroupItem>
                </ToolbarButtonGroup>
            </Toolbar>

        <TableScrollView content={
            <AriaTable 
                {...getTableProps()}
                aria-label="Tabulated Clicks"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                {headerGroups.map((headerGroup, _) => (
                    <TableHeader {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any, hgIndex: number) => (
                            <Column 
                                key={hgIndex} 
                                isRowHeader
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

export default DataTable










// {/* />   */}