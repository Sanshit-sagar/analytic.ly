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
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { 
            pageIndex, 
            pageSize,
        },
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true, 
            pageCount: controlledPageCount,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    React.useEffect(() => {
       fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    if(loading) return <TableSkeleton /> 
    if(error) return <Text> error! </Text> 

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
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
                        {page.map((row, _: number) => {  
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


{/* <TableController */}
// loading={loading}
// error={error}
// canPreviousPage={canPreviousPage}
// canNextPage={canNextPage}
// pageOptions={pageOptions}
// pageCount={pageCount}
// gotoPage={gotoPage}
// nextPage={nextPage}
// previousPage={previousPage}
// setPageSize={setPageSize}
// pageIndex={pageIndex}
// pageSize={pageSize}
// preGlobalFilteredRows={page}
// globalFilter={state.globalFilter}
// setGlobalFilter={setGlobalFilter}
{/* /> */}

// {/* <TableController  */}

// function fuzzyTextFilterFn(rows: any[], id: number, filterValue: string) {
    // return matchSorter(rows, filterValue, { keys: [(row: any) => row.values[id]] })
// }
// const filterTypes = React.useMemo(
    // () => ({
    //   fuzzyText: fuzzyTextFilterFn,
    //   text: (rows: any[], id: number, filterValue: string) => {
        // return rows.filter((row: any) => {
            // const rowValue = row.values[id]
            // return rowValue !== undefined
                // ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                // : true
            // }
        // )
    // },
// }), []);











// {/* />   */}