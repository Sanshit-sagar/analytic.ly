import { styled } from '../stitches.config'

import Head from 'next/head'
import PieChart from '../components/Pie'
import GroupedBars from '../components/Bars'
import { Header } from '../components/Header'
import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'
import { CachedStatistics } from '../components/Statistics'

export interface IDashboardProps {
    children: any; 
    pageMetadata: { 
        [key: string]: string 
    }; 
}

export const MainComponent = styled('div', {
    bc: 'transparent', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px', 
    mt: '$2',
    mb: '$1',
    mr: '$4'
});

export const DashboardLayoutRow = styled('div', {
    height: '100%', 
    width: '100%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start'
});

export const DashboardLayoutGraphRow = styled('div', {
    height: '475px',
    width: '100%',
    display: 'flex',
    fd: 'row',
    jc: 'space-between', 
    ai: 'flex-start',
    gap: '$2'
});


const DashboardLayout = ({ 
    children, 
    pageMetadata
}: IDashboardProps) => {

    const metadata = {
        title: 'analytic.ly',
        description: 'more than just another url shortener',
        cardImage:'',
       ...pageMetadata,
    }

    return (
        <>
            <Head>
                <title>{metadata.title}</title>

                <meta charSet="utf-8" />

                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />

                <meta name="robots" content="follow, index" />
                <link href="/favicon.ico" rel="shortcut icon" />

                <meta content={metadata.description} name="description" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta property="og:title" content={metadata.title} />
                <meta property="og:image" content={metadata.cardImage} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@vercel" />
                <meta name="twitter:title" content={metadata.title} />
                <meta name="twitter:description" content={metadata.description} />
                <meta name="twitter:image" content={metadata.cardImage} />
            </Head>

        
            <AppContainer className='container'>
                <Header /> 

                <ScrollArea>

                    <DashboardLayoutRow>
                        <MainComponent>
                            {children}
                        </MainComponent>
                        <ScrollArea>
                            {/* <CachedStatistics /> */}
                        </ScrollArea>
                    </DashboardLayoutRow>

                    <DashboardLayoutRow>
                        <PieChart />
                        <GroupedBars />
                    </DashboardLayoutRow>

                </ScrollArea>
            </AppContainer>
        </> 
    )
}

export default DashboardLayout