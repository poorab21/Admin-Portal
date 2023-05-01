import { useState } from 'react'
import Layout from '../../../Component/Layout'
import styles from '../../../styles/Users.module.css'
import { AiFillInfoCircle } from 'react-icons/ai'
import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import { Atom } from 'react-loading-indicators'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { checkCookie } from '../../../Component/checkCookie'

export default function Users(){
    const [userType,setUserType] = useState('Servicemen')
    const router = useRouter()

    const fetcher = async (...args) => {
        const response = await axios.get(args)
        if(response.data.success) return response.data.data
    }

    const { data , isLoading , mutate } = useSWR(`http://localhost:3000/api/${userType}`,fetcher)
    
    const getDate = (value) => {
        const date = new Date(value)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const changeStatus = async (id,status) => {
        const response = await axios.post(`http://localhost:3000/api/${userType}/status`,{
            id : id ,
            status : status
        })
        if(response.data.success) mutate()
        else if(!response.data.success && response.data.tokenExpired) router.push('/')
        else if(!response.data.success && !response.data.tokenExpired) console.log('Error in Status Update')
    }

    const hasCookieExpired = async () =>{
        const result = await checkCookie()
        result ? null : router.push('/')
    }
    
    useEffect(()=>{
        hasCookieExpired()
    },[userType])

    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )

    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.heading}>{userType}</p>
                    <select className = {styles.filter} value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option>Servicemen</option>
                        <option>Seeker</option>
                    </select>
                </div>
                <hr/>
                <div className = {styles.body}>
                    <table className = {styles.table}>
                        <tbody>
                            <tr>
                                <th className = {styles.tbHead}>ID</th>
                                <th className = {styles.tbHead}>Name</th>
                                <th className = {styles.tbHead}>Profile</th>
                                <th className = {styles.tbHead}>status</th>
                            </tr>
                            {
                                data && data.map((value,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td className = {styles.tbData}>{value._id}</td>
                                            <td className = {styles.tbData}>{`${value.firstname} ${value.lastname}`}</td>
                                            <td className = {styles.tbData}>
                                                <center>
                                                    {
                                                        userType === 'Servicemen' ?
                                                        <Link href={{
                                                            pathname : `Users/Servicemen/${value._id}` ,
                                                            query : {
                                                                id : value._id ,
                                                                firstname : value.firstname ,
                                                                lastname : value.lastname ,
                                                                cnic : value.cnic ,
                                                                experience : value.experience ,
                                                                contact : value.contact ,
                                                                email : value.email ,
                                                                serviceType : value.serviceType ,
                                                                registration_date : `${getDate(value.registration_date)}`
                                                            }
                                                        }}>
                                                            <AiFillInfoCircle style = {{ cursor : 'pointer' }} size={30}/>
                                                        </Link> : <Link href={{
                                                            pathname : `Users/Seeker/${value._id}` ,
                                                            query : {
                                                                id : value._id ,
                                                                firstname : value.firstname ,
                                                                lastname : value.lastname ,
                                                                contact : value.contact ,
                                                                email : value.email ,
                                                                occupation : value.occupation ,
                                                                registration_date : `${getDate(value.registration_date)}`
                                                            }
                                                        }}>
                                                            <AiFillInfoCircle style = {{ cursor : 'pointer' }} size={30}/>
                                                        </Link>
                                                    }
                                                </center>
                                            </td>
                                            <td className = {styles.tbData}>
                                                <button 
                                                onClick = {() => changeStatus(value._id,!value.blocked)}
                                                className = {styles.statusBtn}>
                                                    { value.blocked ? 'UnBlock' : 'Block' }
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })    
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}