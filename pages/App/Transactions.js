import { useState } from 'react'
import Layout from '../../Component/Layout'
import styles from '../../styles/Transactions.module.css'
import { HiInformationCircle } from 'react-icons/hi'
import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import { Atom } from 'react-loading-indicators'
import Modal from 'react-modal'
import { BiUserCircle } from 'react-icons/bi'

export default function Transactions(){
    const [type,setType] = useState('One-Off')
    const [status,setStatus] = useState('In-Progress')
    const [openModal,setOpenModal] = useState(false)
    const [requestees,setRequestees] = useState([])

    const fetcher = async (...args) => {
        const response = await axios.get(args)
        if(response.data.success) return response.data.transactions
    }

    const { data , error , isLoading } = useSWR(`http://localhost:3000/api/Transactions/${ type === 'One-Off' ? 'OneOff' : 'Contract' }/${ status === 'In-Progress' ? 'InProgress' : 'Requested' }`,fetcher,{
        revalidateOnFocus : true
    })

    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )
    console.log(data)
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <select className = {styles.filter} value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>In-Progress</option>
                        <option>Requested</option>
                    </select>
                    <p className = {styles.heading}>
                        Transactions
                    </p>
                    <select className = {styles.filter} value={type} onChange={(e) => setType(e.target.value)}>
                        <option>One-Off</option>
                        <option>Contract</option>
                    </select>
                </div>
                <hr/>
                <table className = {styles.table}>
                    <tbody>
                        <tr>
                            <th className = {styles.tbHead}>
                                { status === 'Requested' ? 'S.NO' : 'Transaction ID' }
                            </th>
                            <th className = {styles.tbHead}>
                                Service Type
                            </th>
                            <th className = {styles.tbHead}>
                                Customer
                            </th>
                            <th className = {styles.tbHead}>
                                { status === 'Requested' ? 'Offers of Service' : 'Servicemen' }
                            </th>
                            <th className = {styles.tbHead}></th>
                        </tr>
                        {
                            data && data.map((value,index)=>{
                                return (
                                <tr key={index}>
                                    <td className = {styles.tbData}>
                                        { status === 'Requested' ?  index + 1 : value._id }
                                    </td>
                                    <td className = {styles.tbData}>
                                        { value.serviceType }
                                    </td>
                                    <td className = {styles.tbData}>
                                        { value.customer }
                                    </td>
                                    <td className = {styles.tbData}>
                                        { 
                                        status === 'Requested' ? 
                                        <button
                                        disabled = { value.requestees.length > 0 ? false : true  }
                                        className = {styles.viewBtn} 
                                        onClick = {() => { 
                                            setRequestees(value.requestees);
                                            setOpenModal(true)
                                        }}
                                        >
                                            View
                                        </button> 
                                        : 
                                        value.provider 
                                        }
                                    </td>
                                    <td className = {styles.tbData}>
                                        <center style = {{ cursor : 'pointer' }}>
                                            <Link href = {`${status}/${type}/${ status === 'Requested' ? index + 1 : value._id }`}>
                                                <HiInformationCircle 
                                                size = {25} 
                                                color = {'cornflowerblue'}
                                                onMouseOver = {(e) => e.target.setAttribute('color','black') }
                                                onMouseOut = { (e) => e.target.setAttribute('color','cornflowerblue')}
                                                />
                                            </Link>
                                        </center>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Modal
                isOpen = {openModal}
                onRequestClose={() => setOpenModal(false)}
                ariaHideApp = {false}
                style={{
                    content : {
                        margin : 'auto' ,
                        height : '200px' ,
                        width : '300px'
                    }
                }}
                >
                    {
                        requestees.map((value,index)=>{
                            return (
                            <div key={index} className = {styles.requestee}>
                                <div>
                                    <BiUserCircle size={80} color = {'white'}/>
                                </div>
                                <div>
                                    <p className = {styles.requesteeName}>{value.name}</p>
                                    <p className = {styles.contactInfo}>{value.email}</p>
                                    <p className = {styles.contactInfo}>{value.contact}</p>
                                </div>
                            </div>
                            ) 
                        })
                    }
                </Modal>
            </div>
        </Layout>
    )
}