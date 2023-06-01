import '../styles/global.css'
import * as React from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Atom } from 'react-loading-indicators'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../Component/theme';
import createEmotionCache from '../Component/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const queryClient = new QueryClient()
  
  useEffect(()=>{

    router.events.on('routeChangeStart',()=>{
        setLoading(true)
    })

    router.events.on('routeChangeComplete',()=>{
      setLoading(false)
    })
  },[])
  
  if(loading) return <div className = {"spinnerContainer"}>
        <Atom size = {'small'} color={'cornflowerblue'}  />
    </div>

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme = {theme}>
        <CssBaseline/>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps}  />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
    )
}