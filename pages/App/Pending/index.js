import Layout from "../../../Component/Layout";
import styles from '../../../styles/Pending.module.css';
import { IoIosInformationCircle } from 'react-icons/io'
import { FcApprove , FcDisapprove } from 'react-icons/fc'
import useSWR from 'swr'
import axios from "axios";
import moment from 'moment/moment'
import { Atom } from "react-loading-indicators"
import Link from "next/link";
import { useRouter } from "next/router";
import React from 'react'
import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import Head from 'next/head'

export default function Pending(){
    const Months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const router = useRouter()

    const fetcher = async (...args) => {
        const response = await axios.get(args)
        if(response.data.success) return response.data.pendings
    }

    const { data , isLoading , mutate } = useSWR('http://localhost:3000/api/Pending',fetcher,{
        revalidateOnFocus : true
    })

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
        else if(!response.data.success && response.data.tokenExpired) router.push('/')
        else if(!response.data.success && !response.data.tokenExpired) console.log('Error in Credential Update')
    }

    const approve = async (id) => {
        const response = await axios.post('http://localhost:3000/api/Pending/approve',{
            id : id
        })
        if(response.data.success) mutate()
        else if(!response.data.success && response.data.tokenExpired) router.push('/')
        else if(!response.data.success && !response.data.tokenExpired) console.log('Error in Approval')
    }

    const reject = async (id) => {
        const response = await axios.post('http://localhost:3000/api/Pending/reject',{
            id : id
        })
        if(response.data.success) mutate()
        else if(!response.data.success && response.data.tokenExpired) router.push('/')
        else if(!response.data.success && !response.data.tokenExpired) console.log('Error in Rejection')
    }

    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )

    return (
        <>
            <Head>
                <title>
                    Pending Applicants | Maid In
                </title>
            </Head>
            <Layout>
                <React.Fragment>
                    <Stack
                    direction = {'column'}
                    spacing = {2}
                    className = {styles.container}
                    >
                        <Typography className = {styles.heading}>
                            Pending Applications
                        </Typography>
                        <TableVirtuoso
                        data={data}
                        fixedHeaderContent={() => (
                            <TableRow>
                                <TableCell className = {styles.tbHead}>S-NO</TableCell>
                                <TableCell className = {styles.tbHead}>Full Name</TableCell>
                                <TableCell className = {styles.tbHead}>Form Submitted</TableCell>
                                <TableCell className = {styles.tbHead}>Application</TableCell>
                                <TableCell className = {styles.tbHead}>Credentials Submitted</TableCell>
                                <TableCell className = {styles.tbHead}>Status</TableCell>
                            </TableRow>
                        )}
                        itemContent={(index,applicant) => (
                            <>
                                <TableCell className = {styles.tbData}>{ index + 1 }</TableCell>
                                <TableCell className = {styles.tbData}>{`${applicant.firstname} ${applicant.lastname}`}</TableCell>
                                <TableCell className = {styles.tbData}>
                                    {
                                        `${getPendingTime(applicant.registration_date)} day/s ago`
                                    }
                                </TableCell>
                                <TableCell className = {styles.tbData}>
                                    <center>
                                        <Link href={{
                                        pathname : `Pending/${index+1}` ,
                                        query : {
                                            id : applicant._id ,
                                            firstname : applicant.firstname ,
                                            lastname : applicant.lastname ,
                                            serviceType : applicant.serviceType ,
                                            cnic : applicant.cnic ,
                                            experience : applicant.experience ,
                                            contact : applicant.contact ,
                                            email : applicant.email ,
                                            registration_date : `${getDate(applicant.registration_date)}` ,
                                            references : JSON.stringify(applicant.references)
                                        }
                                    }}>
                                            <IoIosInformationCircle 
                                            size={25} 
                                            style = {{ cursor : 'pointer' }} />
                                        </Link>
                                    </center>
                                </TableCell>
                                <TableCell className = {styles.tbData}>
                                {
                                    applicant.credentials ? 
                                    <Typography>Submitted</Typography> 
                                    :
                                    <center>
                                        <Button className = {styles.submittedBtn} onClick = {() => submitted(applicant._id)}>
                                            Submitted
                                        </Button>
                                    </center>
                                        
                                }
                                </TableCell>
                                <TableCell className = {styles.tbData}>
                                    <Button>
                                        <FcApprove size={30} onClick = {() => approve(applicant._id)}/>
                                    </Button>
                                    <Button>
                                        <FcDisapprove size={30} onClick = {() => reject(applicant._id)}/>
                                    </Button>
                                </TableCell>
                            </>
                        )}
                        />
                    </Stack>
                </React.Fragment>
            </Layout>
        </>
    )
}