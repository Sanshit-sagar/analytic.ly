
import '../styles/globals.css'
import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
import { I18nProvider } from '@react-aria/i18n';

function MyApp({ Component, pageProps }) {

  return (
    <IdProvider>
         <SSRProvider>
            <Component {...pageProps} />
         </SSRProvider>
    </IdProvider>
  );
}

export default MyApp
