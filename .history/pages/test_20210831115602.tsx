import React from 'react';

import { AppContainer } from '../primitives/Shared'
import DashboardLayout from '../layouts/DashboardLayout'
import GlobalMercator from '../components/Mercator'
// import AlbersUsa from '../components/AlbersUsa';

const Tester = () => {

    return (
            <GlobalMercator />
    );
}

Tester.getLayout = function getLayout(page: any) {
    return (
        <AppContainer className='container'>
            {/* <DashboardLayout>  */}
                {/* {page}   */}
            {/* </DashboardLayout>  */}
        </AppContainer>
    )
}


export default Tester