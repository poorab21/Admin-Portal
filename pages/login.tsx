import styles from '../styles/Login.module.css'
import Image from 'next/image'
import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TextField , InputAdornment , Button, Typography, Modal , Stack } from '@mui/material'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

export default function Login(){
    const router = useRouter()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [modal,setModal] = useState(false)
    const [inputOTP,setInputOTP] = useState('')
    const [optVerified,setOTPVerified] = useState(false)
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [otp,setOTP] = useState({
        num1 : null ,
        num2 : null ,
        num3 : null ,
        num4 : null
    })
    const emailCriteria =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
    
    const login = async () => {

        if(email.length === 0 || password.length === 0){
            setError('Please fill the form completely')
            return;
        }

        const response = await axios.post('http://localhost:3000/api/login',{
            email : email ,
            password : password
        })
        if(response.data.success) {
            router.replace('/App/Dashboard')
        } 
        else setError('User non-existent in System')
    }

    const isEmailValid = async () => {
        const response = await axios.post('http://localhost:3000/api/forgotPassword/ValidateEmail',{
            email : email
        })
        return response.data.success
    }

    const sendOTP = async () => {
        const response = await axios.post('http://localhost:3000/api/forgotPassword/OTP',{
            email : email
        })

        response.data.success ? setOTP(response.data.OTP) : null
    }

    const forgotPassword = async () => {
        const email_exists = await isEmailValid()
        
        if(email_exists && emailCriteria.test(email)) { setModal(true) ; setError('') ; await sendOTP() }
        else setError('Please enter proper and valid email')    
    }

    const verify = () => {
        if(
        Number(inputOTP[0]) === Number(otp?.num1) 
        && 
        Number(inputOTP[1]) === Number(otp?.num2) 
        && 
        Number(inputOTP[2]) === Number(otp?.num3)
        &&
        Number(inputOTP[3]) === Number(otp?.num4)){
            return true
        }
        return false
    }

    const confirm = async () => {
        const response = await axios.post('http://localhost:3000/api/forgotPassword/ResetPassword',{
            email : email ,
            password : newPassword
        })
        if(response.data.success) router.reload()
        
    }

    const isNewPassValid = () => {
        if(newPassword.length >= 8 && confirmPassword.length >= 8 && confirmPassword === newPassword) return true;
        else return false
    }

    const onCloseModal = () => {
        setOTPVerified(false)
        setModal(false)
        setInputOTP('')
        setNewPassword('')
        setConfirmPassword('')
        setOTP({
            num1 : null ,
            num2 : null ,
            num3 : null ,
            num4 : null
        })
    }

    return (
        <>
            <Head>
                <title>Sign In | Maid-In</title>
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
                            <Typography className = {styles.errorMessage}>
                                {
                                    error
                                }
                            </Typography>
                        </div> : null
                    }
                    <div className = {styles.forgotPassword} onClick={forgotPassword}>
                        <Typography
                        style={{ fontWeight : 'bold' , cursor : 'pointer' }}>
                            Forgot Password ? 
                        </Typography>
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
            <Modal
            open = {modal}
            onClose={onCloseModal}
            style = {{ 
                width : 'fit-content' , 
                height : 'fit-content' , 
                border : '1px solid black' , 
                padding : '10px' , 
                backgroundColor : 'cornflowerblue' ,
                margin : 'auto' ,
                borderRadius : '10px'
            }}
            >
                {
                    optVerified ? 
                    <Stack
                    direction = {'column'}
                    spacing = {2}
                    >
                        <TextField
                        placeholder = {'Enter New Password'}
                        className = {styles.modalInput}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value) }
                        />
                        <TextField
                        placeholder = {'Confirm Password'}
                        className = {styles.modalInput}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value) }
                        />
                        <Stack
                        direction={'row'}
                        spacing={2}
                        >
                            <Button 
                            onClick={onCloseModal}
                            className = {styles.ModalBtn}>
                                Back
                            </Button>
                            <Button 
                            disabled = {!isNewPassValid()}
                            onClick={confirm}
                            className = {styles.ModalBtn}>
                                Confirm
                            </Button>
                        </Stack>
                    </Stack>     
                    :
                    <Stack
                    direction={'column'}
                    spacing={3}
                    className = {styles.container}
                    >
                        <Typography className = {styles.heading}>
                            You will receive OTP via email
                        </Typography>
                        <TextField
                        placeholder = {'Enter OTP'}
                        className = {styles.otpInput}
                        value = {inputOTP}
                        onChange={(e) => setInputOTP(e.target.value)}
                        type = {'text'}
                        />
                        <Button
                        className = {styles.verifyBtn}
                        disabled = { !verify() }
                        onClick={() => setOTPVerified(true)}
                        >
                            Verify
                        </Button>
                        <Stack
                        direction={'row'}
                        spacing={2}
                        justifyContent={'center'}
                        >
                            <Typography className = {styles.codeMessage}>
                                Did not receive verification code ?
                            </Typography>
                            <Button
                            className = {styles.resendCode}
                            onClick={() => { setInputOTP('')  ; sendOTP() }}
                            >
                                Resend Code
                            </Button>
                    </Stack>
                </Stack>
               }
            </Modal>
        </>
    )
}