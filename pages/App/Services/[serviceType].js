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

export default function serviceType(){
    const [modal,setModal] = useState(false)
    const [task,setTask] = useState('')
    const [hourly,setHourly] = useState(100)
    const [selectedTask,setSelectedTask] = useState(null)
    const [action,setAction] = useState(null)
    const router = useRouter()
    const { serviceType } = router.query 
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
        else console.log('Error in Insertion') 
    }

    const del = async (id) => {
        const response = await axios.post(`http://localhost:3000/api/deleteService/${serviceType}`,{
            id : id
        })
        if(response.data.success) { mutate() }
        else console.log('Error in Deletion')
    }

    const edit = async (id) => {
        const response = await axios.post(`http://localhost:3000/api/editService/${serviceType}`,{
            id : id ,
            task : task ,
            hourly : hourly
        })
        if(response.data.success) { closeModal() ; mutate() }
        else console.log('Error in Update')
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
                        <h1 className = {styles.heading}>
                            {serviceType}
                        </h1>
                        <button className = {styles.addBtn} onClick = {() => {
                            setAction('add')
                            setModal(true)
                        }}>
                            <IoMdAdd/>
                        </button>
                    </div>
                    <hr style = {{ border : "1px solid black" }}/>
                    <table className = {styles.table}>
                        <tbody>
                            <tr className = {styles.tbRow}>
                                <th className = {styles.tbHead}>S.No</th>
                                <th className = {styles.tbHead}>Task</th>
                                <th className = {styles.tbHead}>Hourly Wage</th>
                                <th className = {styles.tbHead}></th>
                                <th className = {styles.tbHead}></th>
                            </tr>
                            {
                                data && data.data.map((value,index)=>{
                                    return (
                                    <tr key={index}>
                                    <td className = {styles.tbData}>
                                        {index+1}
                                    </td>
                                    <td className = {styles.tbData}>
                                        {value.task}
                                    </td>
                                    <td className = {styles.tbData}>
                                        {`${value.hourly_wage} PKR`}
                                    </td>
                                    <td className = {styles.tbData}>
                                        <button className = {styles.editBtn} onClick = {() => {
                                            setSelectedTask(value._id)
                                            setTask(value.task)
                                            setHourly(value.hourly_wage)
                                            setAction('edit')
                                            setModal(true)
                                        }}>
                                            <AiFillEdit/>
                                        </button>
                                    </td>
                                    <td className = {styles.tbData}>
                                        <button className = {styles.removeBtn} onClick = {() => del(value._id)}>
                                            <AiFillDelete/>
                                        </button>
                                    </td>
                                </tr>
                                )
                                })
                            }
                        </tbody>
                    </table>
                    <Modal 
                    isOpen = {modal}
                    onRequestClose={() => closeModal()}
                    ariaHideApp = {false}
                    style = {{
                        content : {
                            width : '300px' ,
                            height : '300px' ,
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
                </div>
            </Layout>
        </>
    )
}