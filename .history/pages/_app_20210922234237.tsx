import '../styles/globals.css'


import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactNode, ReactElement } from 'react'

import { SWRConfig } from 'swr'
import { SSRProvider } from '@react-aria/ssr'
import { IdProvider } from '@radix-ui/react-id'
import { I18nProvider } from '@react-aria/i18n'
import { Provider as JotaiProvider } from 'jotai'
import { 
    ClerkProvider, 
    ClerkLoading, 
    SignedIn, 
    SignedOut, 
    RedirectToSignIn 
} from '@clerk/nextjs'

import { Heading } from '../primitives/Heading'

const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]']

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}
  
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const swrFetcher = (resource: string, init: any) => (
    fetch(resource, init).then(res => res.json())
); 

const SWRConfigProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig 
        value={{
            revalidateOnMount: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
            refreshInterval: 50000,
            fetcher: swrFetcher,
        }}
    >
        {children}
    </SWRConfig>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter()

    const getLayout = Component.getLayout ?? ((page) => page)   
    const isPublicPage = publicPages.includes(router.pathname)
    
    return (    
        <SSRProvider>
            <IdProvider>
                <I18nProvider locale={'en-US'}>
                    <ClerkProvider>
                        <JotaiProvider> 
                            <SWRConfigProvider>
                                {getLayout(isPublicPage ? 
                                    <Component {...pageProps} />
                                :  <>
                                    <ClerkLoading> 
                                        <Heading size='4'> LOADING... </Heading>
                                    </ClerkLoading>
                                    <SignedIn>
                                        <Component {...pageProps} />
                                    </SignedIn>
                                    <SignedOut>
                                        <RedirectToSignIn />
                                    </SignedOut>
                                </>)}
                            </SWRConfigProvider>
                        </JotaiProvider>
                    </ClerkProvider> 
                </I18nProvider>
            </IdProvider>
        </SSRProvider>
    );
}

export default MyApp
