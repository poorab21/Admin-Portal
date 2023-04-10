import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Atom } from 'react-loading-indicators'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  
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
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps}  />
    </>
    )
}
