import styles from '../styles/Login.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TextField , InputAdornment , Button } from '@mui/material'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

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
                        priority = {true}
                        style = {{ margin : "auto" , height : "100%" }}
                        />
                    </div>
                </div>
                <form className = {styles.form}>
                    <div className = {styles.field}>    
                        <TextField 
                        onChange={(e) => setEmail(e.target.value)} 
                        label = {'Enter Email Address'}
                        value = {email}  
                        type={'email'} 
                        className = {styles.inputbox} 
                        InputProps={{
                            startAdornment : <InputAdornment position="start">
                                <AiOutlineMail size={30}/>
                            </InputAdornment>
                        }}
                        />
                    </div>
                    <div className = {styles.field}>    
                        <TextField 
                        type={'password'} 
                        label = {'Enter Password'}
                        onChange = {(e) => setPassword(e.target.value)}
                        value = {password}
                        className = {styles.inputbox}
                        InputProps={{
                            startAdornment : <InputAdornment position="start">
                                <RiLockPasswordFill size={30}/>
                            </InputAdornment>
                        }}
                        />
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
                        <Button 
                        type='submit' 
                        className = {styles.submit}
                        onClick = {(e) => { e.preventDefault() ; login() }}>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}