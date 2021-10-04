import { styled } from '../stitches.config'
import { SteamGraph } from '../components/SteamGraph'

const AuthContainer = styled('div', {
    height: '100vh', 
    width: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'stretch' 
});

const ClerkFormSidebar = styled('div', {
    height: '100vh', 
    width: '460px', 
    backgroundColor: 'white'
});

const SteamGraphWrapper = styled('div', {
    height: '100vh', 
    width: '1000px'
})

export function AuthLayout({ 
    children,
    pageMetadata
}: { 
    children: React.ReactNode;
    pageMetadata: { 
        [key: string]: string 
    }; 
}) {
    const metadata = {
        title: 'sign up for analytic.ly',
        description: 'sign up for more than just another url shortener',
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
        <AuthContainer>
            <ClerkFormSidebar>
                {children}
            </ClerkFormSidebar>
            <SteamGraphWrapper>
                <SteamGraph />
            </SteamGraphWrapper>
        </AuthContainer>
    );
}