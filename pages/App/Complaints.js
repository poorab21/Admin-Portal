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
import { MenuItem, Select, Stack, TableCell, TableRow, Typography , TextField , InputAdornment } from '@mui/material'
import { TableVirtuoso } from 'react-virtuoso'
import Head from 'next/head'
import { AiFillFilter } from 'react-icons/ai'

export default function Complaints(){
    const [userType,setUserType] = useState('Servicemen')
    const router = useRouter()    
    const [filterValue,setFilterValue] = useState('')

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

    const filteredData = (data) => {
        const filtered_Result = data.filter((value)=>{
            const fullname = value.customer[0].firstname + ' ' + value.customer[0].lastname
            return fullname.includes(filterValue)
        })
        return filtered_Result;
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
            <Head>
                <title>Grievances | Maid In</title>
            </Head>
            <Layout>
                <Stack  
                direction={'column'} 
                spacing={2} 
                className = {styles.container}>
                    <Stack direction={'row'} className = {styles.header}>
                        <Typography className = {styles.heading}>Grievances</Typography>
                        <Select 
                        className = {styles.filter}
                        value={userType} 
                        onChange={(e)=> setUserType(e.target.value)}>
                            <MenuItem value = {'Servicemen'}>Servicemen</MenuItem>
                            <MenuItem value = {'Seeker'}>Seeker</MenuItem>
                        </Select>
                    </Stack>
                    <TextField
                    type={'text'}
                    value={filterValue}
                    onChange={ (e) => setFilterValue(e.target.value) }
                    style={{ alignSelf : 'center' }}
                        placeholder = {'Search by Name'}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiFillFilter size={20} color = {'black'}/>
                              </InputAdornment>
                            ),
                          }}
                    />
                    <TableVirtuoso 
                    className={styles.table}
                    data = { filterValue.length > 0 ? filteredData(data) : data }
                    itemContent={(index,complaint) => (
                        <>
                            <TableCell className = {styles.row}>{ index + 1 }</TableCell>
                            <TableCell className = {styles.row}>
                                { 
                                    userType === 'Servicemen' ? complaint.email : complaint.message
                                }
                            </TableCell>
                            <TableCell className = {styles.row}>
                            {
                                (new Date(complaint.submission)).getDate() + '/' +
                                Number((new Date(complaint.submission)).getMonth()+1) + '/' +
                                (new Date(complaint.submission)).getFullYear()
                            }
                            </TableCell>
                            <TableCell className = {styles.row}>
                                {`${complaint.customer[0].firstname} ${complaint.customer[0].lastname}`}
                            </TableCell>
                        </>
                    )}
                    fixedHeaderContent={() => (
                        <TableRow>
                            <TableCell className = {styles.tbHead}>S-NO</TableCell>
                            <TableCell className = {styles.tbHead}>Grievances</TableCell>
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