import '../styles/globals.css'


import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactNode, ReactElement } from 'react'

import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
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
import { useStyledToaster } from '../hooks/useStyledToaster'

// import Image from 'next/image'
// import authbg from '../public/assets/authbg.png'


const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]']

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }
type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }

const swrFetcher = (resource: string) => {
    let jsonHeaders = new Headers();
    jsonHeaders.append('Content-Type', 'application/json')
   
    let options: RequestInit = {
        method: 'GET',
        headers: jsonHeaders,
        redirect: 'follow'
    }

    let response = await fetch(resource, options)
    .then((response) => await response.json());
    .catch((error) => error);
}

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

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
                         
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter()
    const toastStyles = useStyledToaster()

    const isPublicPage = publicPages.includes(router.pathname)
    const getLayout = Component.getLayout ?? ((page) => page)   
    
    return (    
        <SSRProvider>
            <IdProvider>
                <I18nProvider locale={'en-US'}>
                    <JotaiProvider> 
                        <SWRConfigProvider>

                            <ClerkProvider
                                frontendApi={clerkFrontendApi}
                                navigate={(to: string) => router.push(to)}
                            >
                                {getLayout(isPublicPage  
                                    ?   <Component {...pageProps} />
                                    : ( <>
                                            <ClerkLoading> 
                                                <Heading size='4'> LOADING... </Heading>
                                            </ClerkLoading>
                                            <SignedIn>
                                                <Component {...pageProps} />
                                            </SignedIn>
                                            <SignedOut>
                                                <RedirectToSignIn />
                                            </SignedOut>
                                        </>)
                                )}             
                            </ClerkProvider> 

                            <Toaster 
                                toastOptions={{
                                    position: 'bottom-right',
                                    ariaProps: {
                                        role: 'status',
                                        'aria-live': 'polite',
                                    },
                                    ...toastStyles,
                                }} 
                            />
                        </SWRConfigProvider>
                    </JotaiProvider>
                </I18nProvider>
            </IdProvider>
        </SSRProvider>
    );
}

export default MyApp
