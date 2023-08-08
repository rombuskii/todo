import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/context/AuthContext'
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <ThemeProvider>
      <title>TODO.</title>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
    </AuthProvider>
  )
}
