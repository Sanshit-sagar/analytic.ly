
import '../styles/globals.css'
import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr'
import { Provider as JotaiProvider } from 'jotai'

function MyApp({ Component, pageProps }) {

  return (
      
    <IdProvider>
         <SSRProvider>
             <JotaiProvider> 
            <Component {...pageProps} />
            
         </SSRProvider>
    </IdProvider>
  );
}

export default MyApp
