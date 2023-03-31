import styles from '../styles/Login.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login(){
    const router = useRouter()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(false)
    const login = async () => {
        const response = await axios.post('http://localhost:3000/api/login',{
            email : email ,
            password : password
        })
        if(response.data.success) {
            router.replace('/App/Dashboard')
        } 
        else setError(true)
    }

    useEffect(()=>{
        router.prefetch('/App/Dashboard')
    },[])

    return (
        <>
            <Head>
                <title>Sign In (Maid-In)</title>
            </Head>
            <div className = {styles.login}>
                <div className = {styles.imgContainer}>
                    <div className = {styles.img}>    
                        <Image
                        src={'/MaidIn.png'}
                        alt = {'Maid In Logo'}
                        width = {400}
                        height = {400}
                        style = {{ margin : "auto" , height : "100%" }}
                        />
                    </div>
                </div>
                <form className = {styles.form}>
                    <div className = {styles.field}>    
                        <label 
                        className = {styles.labeltxt} 
                        htmlFor='email'>
                            Email Address
                        </label>
                        <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value = {email}  
                        type={'email'} 
                        className = {styles.inputbox} />
                    </div>
                    <div className = {styles.field}>    
                        <label 
                        className = {styles.labeltxt} 
                        htmlFor='password'>
                            Password
                        </label>
                        <input 
                        type={'password'} 
                        onChange = {(e) => setPassword(e.target.value)}
                        value = {password}
                        className = {styles.inputbox} />
                    </div>
                    {
                        error ?
                        <div>
                            <p className = {styles.errorMessage}>
                                User non-existent in System
                            </p>
                        </div> : null
                    }
                    <div className = {styles.forgotPassword}>
                        <a href='#'>
                            Forgot Password ?
                        </a>
                    </div>
                    <div  className = {styles.btn}>
                        <input 
                        type={'submit'} 
                        className = {styles.submit}
                        onClick = {(e) => { e.preventDefault() ; login() }} />
                    </div>
                </form>
            </div>
        </>
    )
}