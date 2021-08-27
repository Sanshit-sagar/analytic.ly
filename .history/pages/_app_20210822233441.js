
import '../styles/globals.css'
import { IdProvider } from '@radix-ui/react-id-provider'
import { SSRProvider } from '@react-aria/ssr'
import {I18nProvider, useLocale} from '@react-aria/i18n';

function MyApp({ Component, pageProps }) {
  return (
    <IdProvider>
         <SSRProvider>
             <I18nProvider locale={locale}>
                 <Component {...pageProps} />
             </I18nProvider>
         </SSRProvider>
    </IdProvider>
  );
}

export default MyApp
