import React  from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { TableSkeleton } from './Skeleton'
import AriaTable from './Aria/AriaTable'
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

interface IStatusTextProps {
    status: string; 
    progress: string;
}

const StatusText = ({ status, progress }: IStatusTextProps) => (
    <Text css={{ color: '$color'}}> 
        Progress: {progress} | Status: {status} 
    </Text>
);

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

    let status = loading ? 'loading' : refreshing ? 'refreshing' : finishing ? 'finishing' : 'idle'
    let progress = `PAGE_INDEX: ${pageIndex}`
    
    const mutatePages = () => mutate()
    const firstPage = () => reset()
    const nextPage = () =>  next()
    const previousPage = () =>  previous()
    const lastPage = () => end()

    if(initializing) return <TableSkeleton />

    let atEarliest = pageIndex <= 1
    let atLatest = finishing
   
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Text>
                    <StatusText status={status} progress={progress} />
                    <button 
                        disabled={loading || atEarliest}
                        onClick={firstPage}
                    >
                        {loading ? '...' :  '<<'}
                    </button>
                    <button
                        disabled={loading || atEarliest}
                        onClick={previousPage}
                    >
                        {loading ? '...' : '<'}
                    </button> 
                    <button 
                        disabled={loading || atLatest}
                        onClick={nextPage}
                    >
                        {loading ? "..." : ">"}
                    </button>
                    <button
                        disabled={loading || atLatest}
                        onClick={lastPage}
                    >
                        {loading ? "..." : ">>"}
                    </button>
                    <button 
                        disabled={refreshing || !doMutate} 
                        onClick={mutatePages}
                    >
                        {refreshing ? "..." : "refresh"}
                    </button>
                </Text>

                <Text> {status} | {progress} </Text>
                <Text> {JSON.stringify(clicks)} </Text>
            </Flex>

        
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                <TableScrollView content={
                    <AriaTable 
                        aria-label="Tabulated Clicks"
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                            <TableHeader>
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
                            {clicks && clicks.map((row, _: number) => {  
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
                    </AriaTable>
                />
            </Flex> 
        </Flex>
    );
}

export default DataTable










// {/* />   */}