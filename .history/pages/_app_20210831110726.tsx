
import '../styles/globals.css'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
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
        <IdProvider>
            <SSRProvider>
                <JotaiProvider> 

                    {getLayout(<Component {...pageProps} />)}
                </JotaiProvider>
            </SSRProvider>
        </IdProvider>
    );
}

export default MyApp
