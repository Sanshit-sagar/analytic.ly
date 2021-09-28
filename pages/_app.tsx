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
    RedirectToSignIn,
    ClerkProvider, 
    ClerkLoading, 
    SignIn,
    SignedIn, 
    SignedOut
} from '@clerk/nextjs'

import { Heading } from '../primitives/Heading'

// import Image from 'next/image'
// import authbg from '../public/assets/authbg.png'


const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]']

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }
type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
const swrFetcher = (resource: string, init: any) => fetch(resource, init).then(res => res.json())

const SWRConfigProvider = ({ children }: { children: React.ReactNode }) => (
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
    const getLayout = Component.getLayout ?? ((page) => page)   

    let { pathname } = useRouter()
    let isPublicPage = publicPages.includes(pathname)
    
    return (    
        <SSRProvider>
            <IdProvider>
                <I18nProvider locale={'en-US'}>
                    <JotaiProvider> 
                        <SWRConfigProvider>
                            <ClerkProvider 
                                frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API} 
                            >
                                {getLayout(isPublicPage  
                                    ?   <Component {...pageProps} />
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
                                        </>
                                )}             
                            </ClerkProvider> 
                        </SWRConfigProvider>
                    </JotaiProvider>
                </I18nProvider>
            </IdProvider>
        </SSRProvider>
    );
}

export default MyApp
