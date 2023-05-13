import { useState } from 'react'
import Layout from '../../Component/Layout'
import styles from '../../styles/Complaints.module.css'
import useSWR from 'swr'
import axios from 'axios'
import { Atom } from 'react-loading-indicators'
import { useEffect } from 'react'
import { checkCookie } from '../../Component/checkCookie'
import { useRouter } from 'next/router'
import React from 'react'
import { MenuItem, Select, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { TableVirtuoso } from 'react-virtuoso'

export default function Complaints(){
    const [userType,setUserType] = useState('Servicemen')
    const router = useRouter()

    const fetcher = async () => {
        const response = await axios.get(`http://localhost:3000/api/grievances/${userType}`)
        if(response.data.success) return response.data.grievances;
    }
        
    const { data , isLoading } = useSWR(`http://localhost:3000/api/grievances/${userType}`,fetcher,{
        revalidateOnFocus : true
    })

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
        <React.Fragment>
            <Layout>
                <Stack  
                direction={'column'} 
                spacing={2} 
                className = {styles.container}>
                    <Stack direction={'row'} className = {styles.header}>
                        <Typography className = {styles.heading}>Complaints</Typography>
                        <Select 
                        className = {styles.filter} 
                        label = {'User Type'} 
                        value={userType} 
                        onChange={(e)=> setUserType(e.target.value)}>
                            <MenuItem value = {'Servicemen'}>Servicemen</MenuItem>
                            <MenuItem value = {'Seeker'}>Seeker</MenuItem>
                        </Select>
                    </Stack>
                    <TableVirtuoso 
                    className={styles.table}
                    data = {data}
                    itemContent={(index,complaint) => (
                        <>
                            <TableCell className = {styles.row}>{ index + 1 }</TableCell>
                            <TableCell className = {styles.row}>{ complaint.email }</TableCell>
                            <TableCell className = {styles.row}>
                            {
                                (new Date(complaint.submission)).getDate() + '/' +
                                Number((new Date(complaint.submission)).getMonth()+1) + '/' +
                                (new Date(complaint.submission)).getFullYear()
                            }
                            </TableCell>
                            <TableCell className = {styles.row}>
                                {complaint.person}
                            </TableCell>
                        </>
                    )}
                    fixedHeaderContent={() => (
                        <TableRow>
                            <TableCell className = {styles.tbHead}>S-NO</TableCell>
                            <TableCell className = {styles.tbHead}>Complaint</TableCell>
                            <TableCell className = {styles.tbHead}>Date of Submission</TableCell>
                            <TableCell className = {styles.tbHead}>Made By</TableCell>
                        </TableRow>
                    )}
                    />
                </Stack>
            </Layout>
        </React.Fragment>
    )
}