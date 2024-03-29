import React from 'react'

import Table from '../components/Table'
import TableLayout from '../layouts/TableLayout'

const metadata = {
    title: 'Table',
    description: 'Tabulated data',
};

const TabulatedClicks = () => (
    <Table
        id='tabulatedClicks' 
        aria-label='da label'
        aria-labelledBy='label for da tabel' 
        aria-details='detaibled'
        aria-describedBy='description for a chunky tabulation'
    /> 
);

TabulatedClicks.getLayout = (page: any) => (
    <TableLayout pageMetadata={metadata}> 
        {page} 
    </TableLayout>
);
TabulatedClicks.displayName = 'TabulatedClicks';


export default TabulatedClicks