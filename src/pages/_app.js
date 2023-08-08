import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/context/AuthContext'
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <ThemeProvider>
      <title>TODO.</title>
      <link rel="icon" href="/favicon.ico"/>
      <div id="portal"></div>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
    </AuthProvider>
  )
}
