import Layout from '../../../Component/Layout'
import styles from '../../../styles/Services.module.css'
import ServiceBox from '../../../Component/ServiceBox'
import Head from 'next/head'

export default function Services(){
    return (
        <>
            <Head>
                <title>
                    Services | Maid In
                </title>
            </Head>
            <Layout>
                <div className = {styles.container}>
                    <div className = {styles.images}>
                        <ServiceBox serviceType = {'Gardener'} img = {'/gardening.png'} />
                        <ServiceBox serviceType = {'Maid'} img = {'/maid.png'} />
                    </div>
                    <div className = {styles.images}>
                        <ServiceBox serviceType = {'Electrician'} img = {'/electrician.png'}/>
                        <ServiceBox serviceType = {'Cleaner'} img = {'/Cleaner.jpg'} />
                    </div>
                </div>
            </Layout>
        </>
    )
}