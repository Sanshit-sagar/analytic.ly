import '../styles/globals.css'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { ReactNode, ReactElement } from 'react'

import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
import { I18nProvider } from '@react-aria/i18n'
import { Provider as JotaiProvider } from 'jotai'

import { SWRConfig } from 'swr'


type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}
  
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const SWRConfigProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig 
        value={{
            revalidateOnMount: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
            refreshInterval: 50000,
            fetcher: (resource: string, init: any) => fetch(resource, init).then(res => res.json())
        }}
    >
        {children}
    </SWRConfig>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    
    return (    
        <SSRProvider>
            <IdProvider>
                <I18nProvider locale={'en-US'}>
                    <JotaiProvider> 
                        <SWRConfigProvider>
                            {getLayout(<Component {...pageProps} />)}
                        </SWRConfigProvider>
                    </JotaiProvider>
                </I18nProvider>
            </IdProvider>
        </SSRProvider>
    );
}

export default MyApp
