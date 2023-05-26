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
import React from 'react'
import { MenuItem, Select, Stack, TableCell, TableRow, Typography , Button } from '@mui/material'
import { TableVirtuoso } from 'react-virtuoso'

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
            <React.Fragment>
                <Stack
                direction={'column'}
                spacing = {2}
                className = {styles.container}
                >
                    <Stack
                    direction={'row'}
                    className = {styles.header}
                    >
                        <Typography className = {styles.heading}>
                            { userType }
                        </Typography>
                        <Select value={userType} className = {styles.filter} onChange={(e) => setUserType(e.target.value) }>
                            <MenuItem value = {'Servicemen'}>Servicemen</MenuItem>
                            <MenuItem value = {'Seeker'}>Seeker</MenuItem>
                        </Select>
                    </Stack>
                    <TableVirtuoso
                    data={data}
                    fixedHeaderContent={() => (
                        <TableRow>
                            <TableCell className = {styles.tbHead}>
                                ID
                            </TableCell>
                            <TableCell className = {styles.tbHead}>
                                Name
                            </TableCell>
                            <TableCell className = {styles.tbHead}>
                                Profile
                            </TableCell>
                            <TableCell className = {styles.tbHead}>
                                Status
                            </TableCell>
                        </TableRow>
                    )}
                    itemContent={(index,value) => (
                        <>
                            <TableCell className = {styles.tbData}>{value._id}</TableCell>
                            <TableCell className = {styles.tbData}>{`${value.firstname} ${value.lastname}`}</TableCell>
                            <TableCell className = {styles.tbData}>
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
                                                <AiFillInfoCircle style = {{ cursor : 'pointer' }} size={20}/>
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
                                                <AiFillInfoCircle style = {{ cursor : 'pointer' }} size={20}/>
                                        </Link>
                                    }
                                </center>
                            </TableCell>
                            <TableCell  className = {styles.tbData}>
                                <Button className = {styles.userbtn} onClick = {() => changeStatus(value._id,!value.blocked)}>
                                    { value.blocked ? 'UnBlock' : 'Block' }
                                </Button>
                            </TableCell>
                        </>
                    )}
                    />
                </Stack>
            </React.Fragment>        
        </Layout>
    )
}