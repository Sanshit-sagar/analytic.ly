import { ReactNode } from 'react'

export interface IStyledCellProps {
    value: string;
    xshort?: boolean;
    short?: boolean;
    long?: boolean;
    longish?: boolean; 
    xlong?: boolean;
}

export interface IController {
    loading: boolean;
    error: any;
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: any;
    pageCount: number; 
    gotoPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: (updatedPageSize: number) => void;
    pageIndex: number; 
    pageSize: number; 
    preGlobalFilteredRows: any[];
    globalFilter: string;
    setGlobalFilter: (globalFilter: string | undefined) => void;
}

export interface IPaginator {
    loading: boolean;
    pageIndex: number;
    pageCount: number; 
    canPreviousPage: boolean;
    canNextPage: boolean;
    goToPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    pageOptions: any;
}

export interface IFetchData {
    pageIndex: number;
    pageSize: number; 
}

export interface ITable {
    columns: { Header: string; accessor: string; Cell: ({ value }: IStyledCellProps) => ReactNode; }[]
    data: any[];
    fetchData: ({ pageSize, pageIndex }: IFetchData) => any[];
    loading: boolean;
    error: any | undefined; 
    pageCount: number;
}

export interface IPageSizeSelector {
    loading: boolean;
    pageSize: number;
    setPageSize: (updatedPageSize: number) => void; 
}
