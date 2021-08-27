
import '../styles/globals.css'
import { IdProvider } from '@radix-ui/react-id-provider'
import { SSRProvider } from '@'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
    locale={locale}>
    ...pageProps} />
    >
    </SSRProvider>
  );
}

export default MyApp
