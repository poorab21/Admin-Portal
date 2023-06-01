import { useRouter } from "next/router"
import Layout from "../../../Component/Layout"
import styles from '../../../styles/serviceType.module.css'
import { AiFillEdit , AiFillDelete } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import useSWR from 'swr'
import axios from "axios"
import Modal from 'react-modal'
import { useState } from "react"
import { Atom } from "react-loading-indicators"
import { 
    IconButton, 
    Paper, 
    Stack, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography , 
    Button } from "@mui/material"

export default function ServiceType({ params }){
    const [modal,setModal] = useState(false)
    const [task,setTask] = useState('')
    const [hourly,setHourly] = useState(100)
    const [selectedTask,setSelectedTask] = useState(null)
    const [action,setAction] = useState(null)
    const router = useRouter()
    const { serviceType } = params
    const fetcher = async (...args) => {
        const response = await axios.post(`http://localhost:3000/api/${args}`,{
            serviceType : serviceType
        })
        return response.data
    };
    const { data , isLoading , mutate } = useSWR(`${serviceType}`,fetcher)

    const closeModal = () => {
        setModal(false) ; 
        setTask('') ; 
        setHourly(100)
    }

    const add = async () => {
        const response = await axios.post(`http://localhost:3000/api/addService/${serviceType}`,{
            task : task ,
            hourly : hourly
        })
        if(response.data.success) { closeModal() ; mutate()  }
        else if(!response.data.success && !response.data.tokenExpired) console.log('Error in Insertion')
        else if(!response.data.success && response.data.tokenExpired) router.push('/') 
    }

    const del = async (id) => {
        const response = await axios.post(`http://localhost:3000/api/deleteService/${serviceType}`,{
            id : id
        })
        if(response.data.success) { mutate() }
        else if(!response.data.success && !response.data.tokenExpired) console.log('Error in Deletion')
        else if(!response.data.success && response.data.tokenExpired) router.push('/')     
    }

    const edit = async (id) => {
        const response = await axios.post(`http://localhost:3000/api/editService/${serviceType}`,{
            id : id ,
            task : task ,
            hourly : hourly
        })
        if(response.data.success) { closeModal() ; mutate() }
        else if(!response.data.success && !response.data.tokenExpired) console.log('Error in Editing')
        else if(!response.data.success && response.data.tokenExpired) router.push('/') 
    }


    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )
    return (
        <>  
            <Layout>
                <Stack
                direction = {'column'}
                spacing={2}
                className = {styles.container}
                >   
                    <Stack
                    direction = {'row'}
                    className = {styles.header}
                    >
                        <Typography className = {styles.heading}>{serviceType}</Typography>
                        <IconButton className = {styles.addbtn} onClick = {() => {
                            setAction('add')
                            setModal(true)
                        }}>
                            <IoMdAdd/>
                        </IconButton>
                    </Stack>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className = {styles.tbHead}>S-NO</TableCell>
                                    <TableCell className = {styles.tbHead}>Task</TableCell>
                                    <TableCell className = {styles.tbHead}>Hourly Wage</TableCell>
                                    <TableCell className = {styles.tbHead}></TableCell>
                                    <TableCell className = {styles.tbHead}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.data && data.data.map((value,index)=>{
                                        return (
                                            <TableRow key={value._id}>
                                                <TableCell className = {styles.tbData}>{ index + 1 }</TableCell>
                                                <TableCell className = {styles.tbData}>{value.task}</TableCell>
                                                <TableCell className = {styles.tbData}>
                                                    {`${value.hourly_wage} PKR`}
                                                </TableCell>
                                                <TableCell className = {styles.tbData}>
                                                    <Button onClick = {() => {
                                                        setSelectedTask(value._id)
                                                        setTask(value.task)
                                                        setHourly(value.hourly_wage)
                                                        setAction('edit')
                                                        setModal(true)
                                                    }}>
                                                        <AiFillEdit size={20} color = {'cornflowerblue'} />
                                                    </Button>
                                                </TableCell>
                                                <TableCell className = {styles.tbData}>
                                                    <Button onClick = {() => del(value._id)}>
                                                        <AiFillDelete size={20} color = {'red'} />
                                                    </Button>
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
                    isOpen = {modal}
                    onRequestClose={() => closeModal()}
                    ariaHideApp = {false}
                    style = {{
                        content : {
                            width : 'fit-content' ,
                            height : 'fit-content' ,
                            margin : 'auto' ,
                            display : 'flex' ,
                            flexDirection : 'column'
                        }
                    }}>
                        <input
                        placeholder = {'Task Name'}
                        type = {'text'}
                        value={task}
                        onChange = {(e) => setTask(e.target.value)}
                        className = {styles.input}
                        />
                        <input
                        placeholder = {'Hourly Wage'}
                        type = {'number'}
                        value = {hourly}
                        onChange = {(e) => setHourly(e.target.value)}
                        className = {styles.input}
                        />
                        <button 
                        className = {styles.modalBtn} 
                        onClick = {() => closeModal()}>
                            Back
                        </button>
                        <button 
                        className = {styles.modalBtn} 
                        onClick={action === 'add' ? () => add() : () => edit(selectedTask)}>
                            Confirm
                        </button>
                    </Modal>
            </Layout>
        </>
    )
}

export function getServerSideProps(context){
    return {
        props : {
            params : context.params
        }
    }
}