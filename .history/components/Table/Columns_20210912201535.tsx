import React, { useMemo } from 'react'
import { StyledCell, StyledHeader } from './Cells'
import { useDateFormatter } from '@react-aria/i18n'

interface ITimestampCellProps {
    [value: string]: { 
        localeTime: string;
        timeAgo: string;
    };
}

interface ICellProps {
    value: string;
};

type DateFormatType = 'short' | 'medium' | 'long' | 'full' | 'numeric'

//https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
type LocaleType = 'en-US' | 'de-DE' | 'en-GB' | 'ko-KR' | 'default'; // typeof Intl.DateTimeFormat(locale)

interface IDateTimeFormatProps {
    locale: LocaleType;
    options: IDateFormatterOptionsProps;
};

interface IDateFormatterOptionsProps {
    dateStyle?: DateFormatType;
    timeStyle?: DateFormatType;
    year?: DateFormatType;
    yearName?: DateFormatType;
    month?: DateFormatType;
    day?: DateFormatType;
    hour?: DateFormatType;
    minute?: DateFormatType;
    second?: DateFormatType;
    dayPeriod?: DateFormatType;
    timezoneName?: DateFormatType;
    timezone?: string;
    hour12?: boolean;
    calendar?: string;
    numberingSystem?: string; 
};


export const getColumns = () => {
    let formatter = useDateFormatter({ dateStyle: 'short', timeStyle: 'short' }: IDateFormatterOptionsProps);

    const clicksColumns = useMemo(() => [
        { 
            Header:  <StyledHeader value={'Slug'} />, 
            accessor: 'slug', 
            Cell: ({ value }: ICellProps) => <StyledCell value={value} xlong={true} />,
        },
        { 
            Header:  <StyledHeader value={'Destination URL'} />, 
            accessor: 'destination',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} long={true} />,
        },
        { 
            Header:  <StyledHeader value={'Timestamp'} />,
            accessor: 'timestamp',
            Cell: ({ value }: ITimestampCellProps) => (
                <StyledCell value={formatter.format(new Date(value.localeTime))} />
            ),
        },
        {
            Header: <StyledHeader value={'Clicks'} />,
            accessor: 'clicks',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} />
        },
        { 
            Header: <StyledHeader value={'Country'} />, 
            accessor: 'country',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} short={true} />,
        },
        { 
            Header:  <StyledHeader value={'Location'} />,
            accessor: 'location',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} long={true} />,
        },
        { 
            Header: <StyledHeader value={'Coordinates'} />,
            accessor: 'geodata',
            Cell: ({ value }: ICellProps) => <StyledCell value={value} />,
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