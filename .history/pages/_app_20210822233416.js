
import '../styles/globals.css'
import { IdProvider } from '@radix-ui/react-id-provider'
import { SSRProvider } from '@'

function MyApp({ Component, pageProps }) {
  return (
    <IdProvider>
         <SSRProvider>
             <I18nProvider locale={locale}>
                 <Component {...pageProps} />
             </I18nProvider>
         </SSRProvider>
  );
}

export default MyApp
