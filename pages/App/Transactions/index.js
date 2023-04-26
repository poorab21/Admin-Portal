import { useState } from 'react'
import Layout from '../../../Component/Layout'
import styles from '../../../styles/Transactions.module.css'
import { HiInformationCircle } from 'react-icons/hi'
import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import { Atom } from 'react-loading-indicators'
import Modal from 'react-modal'
import { BiUserCircle } from 'react-icons/bi'
import { BsFillCalendarDateFill , BsFillArrowLeftCircleFill , BsFillArrowRightCircleFill } from 'react-icons/bs'
import Calendar from 'react-calendar'

export default function Transactions(){
    const [type,setType] = useState('One-Off')
    const [status,setStatus] = useState('In-Progress')
    const [openModal,setOpenModal] = useState(false)
    const [requestees,setRequestees] = useState([])
    const [date,setDate] = useState(new Date())
    const [openCalendar,setOpenCalendar] = useState(false)
    const Months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const fetcher = async (...args) => {
        const response = status === 'Completed' ? await axios.post(args,{
            date : date
        }) : await axios.get(args)
        if(response.data.success) return response.data.transactions
    }
    const { data , isLoading } = useSWR(`http://localhost:3000/api/Transactions/${type}/${status}`,fetcher,status === 'Completed' ? {
        refreshInterval : 500
    } : null)
    const getID = (value,index) => {
        if(status === 'Requested') return index + 1;
        else if(status === 'Completed') return value.transaction_id;
        else return value._id; 
    }
    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <select className = {styles.filter} value={status} onChange={(e) => { setStatus(e.target.value) ; }}>
                        <option>In-Progress</option>
                        <option>Requested</option>
                        <option>Completed</option>
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
                {  
                    status === 'Completed' ? (
                        <div className = {styles.filterContainer} onClick = {() => setOpenCalendar(true)}>
                            <span>
                                <BsFillCalendarDateFill/>
                            </span>
                            <span style = {{ marginLeft : '10px' , fontWeight : 'bold' , fontStyle : 'italic' }}>
                                {`${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`}
                            </span>
                        </div>
                    ) : null
                }
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
                                        { getID(value,index) }
                                    </td>
                                    <td className = {styles.tbData}>
                                        { status === 'Completed' ? value.service_type : value.serviceType }
                                    </td>
                                    <td className = {styles.tbData}>
                                        {` ${value.customer[0].firstname} ${value.customer[0].lastname} `}
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
                                        `${value.provider[0].firstname} ${value.provider[0].lastname}` 
                                        }
                                    </td>
                                    <td className = {styles.tbData}>
                                        <center style = {{ cursor : 'pointer' }}>
                                            <Link href = {{
                                                pathname : `Transactions/${status}/${type}/${getID(value,index)}` ,
                                                query : { 
                                                        ...value ,
                                                        customer : `${value.customer[0].firstname} ${value.customer[0].lastname}` ,
                                                        provider : `${value.provider[0]?.firstname} ${value.provider[0]?.lastname}`,
                                                        TaskList : JSON.stringify(value.TaskList) ,
                                                        TOC : JSON.stringify(value.TOC) ,
                                                        Ratings : JSON.stringify(value.Ratings)
                                                }
                                                }
                                            }>
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
                                    <p className = {styles.requesteeName}>{value.firstname + ' ' + value.lastname}</p>
                                    <p className = {styles.contactInfo}>{value.email}</p>
                                    <p className = {styles.contactInfo}>{value.contact}</p>
                                </div>
                            </div>
                            ) 
                        })
                    }
                </Modal>
                <Modal
                isOpen = {openCalendar}
                ariaHideApp = {false}
                style={{
                    content : {
                        width: "fit-content",
                        height: "fit-content",
                        margin: "auto"
                    }
                }}
                onRequestClose={() => setOpenCalendar(false)}
                >
                    <Calendar
                    tileClassName = {styles.tile}
                    className = {styles.calendar}
                    defaultValue={date}
                    view = {'month'}
                    prev2Label = {<BsFillArrowLeftCircleFill/>}
                    next2Label = {<BsFillArrowRightCircleFill/>}
                    nextLabel = {<BsFillArrowRightCircleFill/>}
                    prevLabel = {<BsFillArrowLeftCircleFill/>}
                    onClickDay={(date) => { setDate(date) ; setOpenCalendar(false) } } 
                    />
                </Modal>
            </div>
        </Layout>
    )
}