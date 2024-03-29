import '../styles/globals.css'

import type { AppProps, NextWebVitalsMetric } from 'next/app'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode, ReactElement } from 'react'

import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import { SSRProvider } from '@react-aria/ssr'
import { IdProvider } from '@radix-ui/react-id'
import { I18nProvider } from '@react-aria/i18n'
import { Provider as JotaiProvider } from 'jotai'
import { ClerkProvider, ClerkLoading, SignedIn, SignedOut } from '@clerk/nextjs'

import SignUpPage from './sign-up/[[...index]]'
import SignInPage from './sign-in/[[...index]]'

import { Heading } from '../primitives/Heading'
import { useStyledToaster } from '../hooks/useStyledToaster'

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }
type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }

const swrFetcher = (r: string) => fetch(r).then((r) => r.json())
const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]']

const SWRConfigProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig 
        value={{
            revalidateOnMount: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
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
    const toastStyles = useStyledToaster()

    const isPublicPage = publicPages.includes(router.pathname)
    const getLayout = Component.getLayout ?? ((page) => page)   
    
    return (    
        <SSRProvider>
            <IdProvider>
                <I18nProvider locale={'en-US'}>
                    <JotaiProvider> 
                        <SWRConfigProvider>

                            <ClerkProvider>
                                {getLayout(isPublicPage  
                                    ?   <Component {...pageProps} />
                                    : ( <>
                                            {/* <ClerkLoading> 
                                                <Heading size='4'> LOADING... </Heading>
                                            </ClerkLoading> */}

                                            <SignedIn>
                                                <Component {...pageProps} />
                                            </SignedIn>
                                            <SignedOut>
                                                {
                                                        router.pathname.match("/sign-up") 
                                                    ?   <SignUpPage /> 
                                                    :   <SignInPage />
                                                }
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

export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(`******* WEB VITALS ******* ${metric}`)
}

export default MyApp
