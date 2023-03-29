import Head from 'next/head'
import Dashboard from '../pages/App/Dashboard'
import Login from './login'

export default function Home() {
  return (
    <>  
      <Head>
        <title>Maid In</title>
      </Head>
      <Login/>
    </>
  )
}
