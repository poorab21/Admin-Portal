import Layout from "../../../Component/Layout";
import styles from '../../../styles/Pending.module.css';
import { IoIosInformationCircle } from 'react-icons/io'
import { FcApprove , FcDisapprove } from 'react-icons/fc'
import Modal from 'react-modal'
import { useState } from "react";
import useSWR from 'swr'
import axios from "axios";
import moment from 'moment/moment'
import { Atom } from "react-loading-indicators"
import Link from "next/link";

export default function Pending(){
    const [showRef,setShowRef] = useState(false)
    const [references,setReferences] = useState([])

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
                                    <th className = {styles.tbHead}>Date of Submission</th>
                                    <th className = {styles.tbHead}>References</th>
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
                                                    `${
                                                        (new Date(value.registration_date)).getDate()
                                                    }/${
                                                        (new Date(value.registration_date)).getMonth() + 1
                                                    }/${
                                                        (new Date(value.registration_date)).getFullYear()
                                                    } (${getPendingTime()} days ago)`
                                                    }
                                                </td>
                                                <td className = {styles.tbData}>
                                                    <center>
                                                        <IoIosInformationCircle 
                                                        onClick={() => { setShowRef(true) ; setReferences(value.references) }} 
                                                        size={25} 
                                                        style = {{ cursor : 'pointer' }} />
                                                    </center>
                                                </td>
                                                <td className = {styles.tbData}>
                                                    <center>
                                                        <Link href={{
                                                            pathname : `Pending/${index+1}` ,
                                                            query : {
                                                                firstname : value.firstname ,
                                                                lastname : value.lastname ,
                                                                serviceType : value.serviceType ,
                                                                cnic : value.cnic ,
                                                                experience : value.experience ,
                                                                contact : value.contact ,
                                                                email : value.email
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
                    <Modal
                    isOpen = {showRef}
                    onRequestClose={() => setShowRef(false)}
                    className={styles.modal}
                    >
                        <table>
                            <tbody>
                                <tr className = {styles.refRow}>
                                    <th className = {styles.tbHead}>S.No</th>
                                    <th className = {styles.tbHead}>Name</th>
                                    <th className = {styles.tbHead}>Occupation</th>
                                    <th className = {styles.tbHead}>Contact</th>
                                    <th className = {styles.tbHead}>Email Address</th>
                                </tr>
                                {
                                    references.map((value,index)=>{
                                        return (
                                            <>
                                                <tr className = {styles.refRow} key={index}>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        { index + 1 }
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.name}
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.occupation}
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.contact}
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.email}
                                                    </td>
                                                </tr>
                                                <tr className = {styles.refRow} key={index}>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        { index + 1 }
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.name}
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.occupation}
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.contact}
                                                    </td>
                                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>
                                                        {value.email}
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Modal>
                </div>
            </Layout>
        </>
    )
}