import React, { useState, useMemo } from 'react'

import { 
    useTable, 
    useSortBy, 
    usePagination, 
    useFilters, 
    useGlobalFilter 
} from 'react-table'

import AriaTable from './Aria/AriaTable'

import { TableScrollView } from './ScrollView'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { ITable } from './interfaces'
import { TableSkeleton } from './Skeleton'
// import { useFilter } from '@react-aria/i18n'

import {
    Cell,
    Column,
    Row,
    TableBody,
    TableHeader
} from '@react-stately/table'

const DataTable = ({ columns, data, fetchData, loading, error,  pageCount: controlledPageCount }: ITable) => {

    let [selectedKeys, setSelectedKeys] = useState(new Set([]))

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
      } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true, 
            pageCount: controlledPageCount,
        },
        usePagination
    );

    const loadMore = () => fetchData()

    if(!loading) return <TableSkeleton /> 
    if(error) return <Text> error! </Text> 
   

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <button onClick={loadMore}> next </button> 
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
                        {data.map((row, _: number) => {  
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