import { useState , useEffect } from 'react'
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
import { checkCookie } from '../../../Component/checkCookie'
import { useRouter } from 'next/router'
import { Button, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

export default function Transactions(){
    const [type,setType] = useState('One-Off')
    const [status,setStatus] = useState('In-Progress')
    const [openModal,setOpenModal] = useState(false)
    const [requestees,setRequestees] = useState([])
    const [date,setDate] = useState(new Date())
    const [openCalendar,setOpenCalendar] = useState(false)
    const router = useRouter()

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

    const hasCookieExpired = async () =>{
        const result = await checkCookie()
        result ? null : router.push('/')
    }
    
    useEffect(()=>{
        hasCookieExpired()
    },[type,status,date])

    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )
    return (
        <Layout>
            <Stack
            direction = {'column'}
            spacing = {2}
            className = {styles.container}
            >
                <Stack
                direction={'row'}
                className = {styles.header}
                >
                    <Select value={status} onChange={(e) => { setStatus(e.target.value) ; }}>
                        <MenuItem value = {'In-Progress'}>In-Progress</MenuItem>
                        <MenuItem value = {'Requested'}>Requested</MenuItem>
                        <MenuItem value = {'Completed'}>Completed</MenuItem>
                    </Select>
                    <Typography className = {styles.heading}>Transactions</Typography>
                    <Select value={type} onChange={(e) => { setType(e.target.value) ; }}>
                        <MenuItem value = {'One-Off'}>One-Off</MenuItem>
                        <MenuItem value = {'Contract'}>Contract</MenuItem>
                    </Select>
                </Stack>
                {  
                    status === 'Completed' ? (
                        <div className = {styles.filterContainer} onClick = {() => setOpenCalendar(true)}>
                            <span>
                                <BsFillCalendarDateFill size={20}/>
                            </span>
                            <span 
                            id = "date"
                            style = {{ marginLeft : '10px' , fontWeight : 'bold' , fontStyle : 'italic' , fontSize : 'medium' }}>
                                {`${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`}
                            </span>
                        </div>
                    ) : null
                }
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className = {styles.tbHead}>
                                    { status === 'Requested' ? 'S.NO' : 'Transaction ID' }
                                </TableCell>
                                <TableCell className = {styles.tbHead}>
                                    Service Type
                                </TableCell>
                                <TableCell className = {styles.tbHead}>
                                    Customer
                                </TableCell>
                                <TableCell className = {styles.tbHead}>
                                    { status === 'Requested' ? 'Offers of Service' : 'Servicemen' }
                                </TableCell>
                                <TableCell className = {styles.tbHead}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data && data.map((value,index)=>{
                                    return (
                                        <TableRow key = {value._id}>
                                            <TableCell className = {styles.tbData}>
                                                { getID(value,index) }
                                            </TableCell>
                                            <TableCell className = {styles.tbData}>
                                                { status === 'Completed' ? value.service_type : value.serviceType }
                                            </TableCell>
                                            <TableCell className = {styles.tbData}>
                                                {` ${value.customer[0].firstname} ${value.customer[0].lastname} `}
                                            </TableCell>
                                            <TableCell className = {styles.tbData}>
                                            { 
                                            status === 'Requested' ? 
                                            <Button
                                            disabled = { value.requestees.length > 0 ? false : true  }
                                            className = {styles.viewBtn} 
                                            onClick = {() => { 
                                                setRequestees(value.requestees);
                                                setOpenModal(true)
                                            }}
                                            >
                                                View
                                            </Button> 
                                            : 
                                            `${value.provider[0].firstname} ${value.provider[0].lastname}` 
                                            }
                                            </TableCell>
                                            <TableCell className = {styles.tbData}>
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
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>        

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
        </Layout>
    )
}