import { styled } from '../stitches.config'

import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import PieChart from '../components/Pie'
import Plafond from '../components/Plafond'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'


export interface IDashboardProps {
    children: any; 
    meta: pageMeta; 
}

export const MainComponent = styled('div', {
    bc: 'transparent', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px', 
    ml: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
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


const DashboardLayout = ({ children, meta }) => {
    const meta = {
        title: 'Prism with Next.js',
        description:
          'Example using Prism / Markdown with Next.js including switching syntax highlighting themes.',
        cardImage:
          'https://og-image.now.sh/**Prism**%20with%20Next.js.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg',
       ...pageMeta,
    };    

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta charSet="utf-8" />
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta name="robots" content="follow, index" />
                <link href="/favicon.ico" rel="shortcut icon" />
                <meta content={meta.description} name="description" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.cardImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@vercel" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.cardImage} />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
                    as="script"
                />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css"
                    as="script"
                />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
                    as="script"
                />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css"
                    as="script"
                />
                <link
                    href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${theme}.css`}
                    rel="stylesheet"
                />
            </Head>

        
            <AppContainer className='container'>
                <Plafond /> 

                <ScrollArea>
                    <DashboardLayoutRow>
                        <MainComponent>
                            {children}
                        </MainComponent>
                        <Statistics />
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