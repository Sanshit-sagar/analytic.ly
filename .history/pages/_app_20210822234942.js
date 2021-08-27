
import '../styles/globals.css'
import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'

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
