import Layout from "../../../Component/Layout";
import styles from '../../../styles/Pending.module.css';
import { IoIosInformationCircle } from 'react-icons/io'
import { FcApprove , FcDisapprove } from 'react-icons/fc'
import useSWR from 'swr'
import axios from "axios";
import moment from 'moment/moment'
import { Atom } from "react-loading-indicators"
import Link from "next/link";

export default function Pending(){
    const Months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const fetcher = async (...args) => {
        const response = await axios.get(args)
        if(response.data.success) return response.data.pendings
    }

    const { data , isLoading , mutate } = useSWR('http://localhost:3000/api/Pending',fetcher)

    const getPendingTime = (date) => {
        const currentDate = new Date()
        const duration = moment(currentDate).diff(date,'days')
        return duration
    }

    const getDate = (date) => {
        const value = new Date(date)
        return `${value.getDate()} ${Months[value.getMonth()]} ${value.getFullYear()}`
    }

    const submitted = async (id) => {
        const response = await axios.post('http://localhost:3000/api/Pending/submitted',{
            id : id
        }) 
        if(response.data.success) { mutate() }
        else console.log('Error in Credential Update')
    }

    const approve = async (id) => {
        const response = await axios.post('http://localhost:3000/api/Pending/approve',{
            id : id
        })
        if(response.data.success) mutate()
        else console.log('Error in Approval')
    }

    const reject = async (id) => {
        const response = await axios.post('http://localhost:3000/api/Pending/reject',{
            id : id
        })
        if(response.data.success) mutate()
        else console.log('Error in Rejection')
    }

    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )

    return (
        <>
            <Layout>
                <div className = {styles.container}>
                    <div className = {styles.header}>
                        <p className = {styles.heading}>Pending Applications</p>
                    </div>
                    <div className = {styles.body}>
                        <table className = {styles.applicants}>
                            <tbody>
                                <tr>    
                                    <th className = {styles.tbHead}>S.NO</th>
                                    <th className = {styles.tbHead}>Full Name</th>
                                    <th className = {styles.tbHead}>Form Submitted</th>
                                    <th className = {styles.tbHead}>Application</th>
                                    <th className = {styles.tbHead}>Credentials submitted</th>
                                    <th className = {styles.tbHead}>Status</th>
                                </tr>
                                {
                                    data && data.map((value,index)=>{
                                        return (
                                            <tr key = {index}>
                                                <td className = {styles.tbData}>
                                                    { index + 1 }
                                                </td>
                                                <td className = {styles.tbData}>
                                                    {`${value.firstname} ${value.lastname}`}
                                                </td>
                                                <td className = {styles.tbData}>
                                                    {
                                                    `${getPendingTime(value.registration_date)} day/s ago`
                                                    }
                                                </td>
                                                <td className = {styles.tbData}>
                                                    <center>
                                                        <Link href={{
                                                            pathname : `Pending/${index+1}` ,
                                                            query : {
                                                                id : value._id ,
                                                                firstname : value.firstname ,
                                                                lastname : value.lastname ,
                                                                serviceType : value.serviceType ,
                                                                cnic : value.cnic ,
                                                                experience : value.experience ,
                                                                contact : value.contact ,
                                                                email : value.email ,
                                                                registration_date : `${getDate(value.registration_date)}` ,
                                                                references : JSON.stringify(value.references)
                                                            }
                                                        }}>
                                                            <IoIosInformationCircle 
                                                            size={25} 
                                                            style = {{ cursor : 'pointer' }} />
                                                        </Link>
                                                    </center>
                                                </td>
                                                <td className = {styles.tbData}>
                                                    {
                                                        value.credentials ? 'Submitted' :    
                                                        <button 
                                                        className = {styles.submittedBtn} 
                                                        onClick = {() => submitted(value._id)}>
                                                            Submitted
                                                        </button>
                                                    }
                                                </td>
                                                <td className = {styles.tbData}>
                                                    <button>
                                                        <FcApprove size={30} onClick = {() => approve(value._id)}/>
                                                    </button>
                                                    <button>
                                                        <FcDisapprove size={30} onClick = {() => reject(value._id)}/>
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
        </>
    )
}