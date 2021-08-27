
import '../styles/globals.css'
import { IdProvider } from '@radix-ui/react-id-provider'
import { SSRProvider } from '@'

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp
