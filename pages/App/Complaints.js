import { useState } from 'react'
import Layout from '../../Component/Layout'
import styles from '../../styles/Complaints.module.css'
import useSWR from 'swr'
import axios from 'axios'
import { Atom } from 'react-loading-indicators'

export default function Complaints(){
    const [userType,setUserType] = useState('Servicemen')

    const fetcher = async (...args) => {
        const response = await axios.get(`http://localhost:3000/api/grievances/${userType}`)
        if(response.data.success) return response.data.grievances;
    }

    const { data , error , isLoading } = useSWR(`http://localhost:3000/api/grievances/${userType}`,fetcher,{
        revalidateOnFocus : true
    })
    
    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )

    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.userType}>
                        {userType}
                    </p>
                    <select className = {styles.filter} onChange = {(e) => setUserType(e.target.value)}>
                        <option>Servicemen</option>
                        <option>Seeker</option>
                    </select>
                </div>
                <hr/>
                <table className = {styles.table}>
                    <tbody>
                        <tr className = {styles.tbRow}>
                            <th className = {styles.tbHead}>
                                S.No
                            </th>
                            <th className = {styles.tbHead}>
                                Grievance
                            </th>
                            <th className = {styles.tbHead}>
                                Date of Submission
                            </th>
                            <th className = {styles.tbHead}>
                                Made By
                            </th>
                        </tr>
                        {
                            data && data.map((value,index)=>{
                                return (
                                    <>
                                        <tr key={index}>
                                            <td className = {styles.tbData}>
                                                { index + 1 }
                                            </td>
                                            <td className = {styles.tbData}>
                                                { value.email }
                                            </td>
                                            <td className = {styles.tbData}>
                                                {
                                                    (new Date(value.submission)).getDate() + '/' +
                                                    Number((new Date(value.submission)).getMonth()+1) + '/' +
                                                    (new Date(value.submission)).getFullYear()
                                                
                                                }
                                            </td>
                                            <td className = {styles.tbData}>
                                                {value.person}
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}