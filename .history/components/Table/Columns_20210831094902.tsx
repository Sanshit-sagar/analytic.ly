import React, { useMemo } from 'react'
import { StyledCell, StyledHeader } from './Cells'

interface ICellProps {
    value: string; 
}

export const getColumns = () => {
    
    const clicksColumns = useMemo(() => [
        { 
            Header:  <StyledHeader value={'Slug'} />, 
            accessor: 'slug', 
            Cell: ({ value }: ICellProps) => <StyledCell value={value} />,
        },
        { 
            Header:  <StyledHeader value={'Destination URL'} />, 
            accessor: 'destination',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} long/>,
        },
        { 
            Header:  <StyledHeader value={'Timestamp'} />,
            accessor: 'timestamp',
            Cell: ({ value }: ICellProps) => <StyledCell value={value.localeTime} long={true} /> 
        },
        {
            Header: <StyledHeader value={'Clicks'} />,
            accessor: 'clicks',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} />
        },
        { 
            Header: <StyledHeader value={'Country'} />, 
            accessor: 'country',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} />,
        },
        { 
            Header:  <StyledHeader value={'Location'} />,
            accessor: 'location',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: <StyledHeader value={'IP Address'} />,
            accessor: 'ip',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} long={true} /> 
        },
        { 
            Header: <StyledHeader value={'Browser'} />,
            accessor: 'browser',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} short={true} />,
        },
        { 
            Header:<StyledHeader value={'Engine'} />, 
            accessor: 'engine',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader value={'OS'} />,
            accessor: 'os',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader value={'TLS Version'} />,
            accessor: 'tlsVersion',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} short={true}  />,
        },
        { 
            Header: <StyledHeader value={'HTTP Protocol'} />, 
            accessor: 'httpProtocol',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader value={'Geodata'} />,
            accessor: 'geodata',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} />,
        },
        { 
            Header: <StyledHeader value={'Metro Code'} />,
            accessor: 'metroCode',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} short={true} />,
        },
        { 
            Header: <StyledHeader value={'ASN'} />,
            accessor: 'asn',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} xshort={true} /> 
        },
        {
            Header: <StyledHeader value={'TLS Cipher'} />,
            accessor: 'tlsCipher',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} />,
        },     
        {
            Header: <StyledHeader value={'Accept Encoding'} />,
            accessor: 'clientAcceptEncoding',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} long={true} />,
        }
    ], []);

    return clicksColumns
}