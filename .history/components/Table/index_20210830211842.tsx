import React, { useState, useEffect, useMemo } from 'react'

import { 
    useTable, 
    useSortBy, 
    usePagination, 
    useFilters, 
    useGlobalFilter 
} from 'react-table'

import AriaTable from './Aria/AriaTable'
import TableController from './Controller'
import { TableScrollView } from './ScrollView'
import { Text } from '../../primitives/Text'
import { ITable } from './interfaces'

import {
    Cell,
    Column,
    Row,
    TableBody,
    TableHeader
} from '@react-stately/table'
import {matchSorter} from 'match-sorter'

function fuzzyTextFilterFn(rows: any[], id: number, filterValue: string) {
    return matchSorter(rows, filterValue, { keys: [(row: any) => row.values[id]] })
}

const DataTable = ({ columns, data, fetchData, loading, error, pageCount: controlledPageCount }: ITable) => {

    let [selectedKeys, setSelectedKeys] = useState(new Set([]));

    const filterTypes = React.useMemo(
        () => ({
          fuzzyText: fuzzyTextFilterFn,
          text: (rows: any[], id: number, filterValue: string) => {
            return rows.filter((row: any) => {
                const rowValue = row.values[id]
                return rowValue !== undefined
                    ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                    : true
                }
            )
        },
    }), []);

    function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter }}: { column: { filterValue: string; preFilteredRows: any[]; setFilter: (updatedFilter: string | undefined) => void }}) {
        const count = preFilteredRows.length
        return (
            <input
                value={filterValue || ''}
                onChange={(e) => {
                    setFilter(e.target.value || undefined)
                }}
                placeholder={`Search ${count} records...`}
            />
        )
    }
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
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
            pageSize 
        },
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            initialState: { 
                pageIndex: 0 
            }, 
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    useEffect(() => {
        fetchData({ pageSize, pageIndex });
    }, [fetchData, pageIndex, pageSize]);

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error </Text>

    return (
        <>
             <TableController 
               loading={loading}
               error={error}
               canPreviousPage={canPreviousPage}
               canNextPage={canNextPage}
               pageOptions={pageOptions}
               pageCount={pageCount}
               gotoPage={gotoPage}
               nextPage={nextPage}
               previousPage={previousPage}
               setPageSize={setPageSize}
               pageIndex={pageIndex}
               pageSize={pageSize}
               preGlobalFilteredRows={page}
               globalFilter={state.globalFilter}
               setGlobalFilter={setGlobalFilter}
            />  
            <TableScrollView content={
                <AriaTable
                    aria-label="Tabulated Clicks"
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    {headerGroups.map((headerGroup, _) => (
                        <TableHeader {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any, hgIndex: number) => (
                                <Column key={hgIndex} {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </Column>
                            ))}
                        </TableHeader>
                    ))} 
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row, _) => {  
                            prepareRow(row)

                            return (
                                <Row {...row.getRowProps()}>
                                    {row.cells.map(cell => {
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
        </>
    );
}



export default DataTable
