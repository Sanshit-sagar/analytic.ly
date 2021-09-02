
import '../styles/globals.css'

import Head from 'next/head'
import React from 'react'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { IdProvider } from '@radix-ui/react-id'
import { Provider as JotaiProvider } from 'jotai'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
  
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    
    return (
        <React.StrictMode>
            <Head>
                <title>analyticly interesting</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <IdProvider>
                <JotaiProvider> 
                    {getLayout(<Component {...pageProps} />)}
                </JotaiProvider>
            </IdProvider>
        </React.StrictMode>
    );
}

export default MyApp
