import { useRouter } from "next/router"
import styles from '../../../../../styles/OneOff.module.css'
import Layout from "../../../../../Component/Layout"
import FieldData from "../../../../../Component/FieldData"
import clsx from "clsx"
import React, { useState } from "react"
import { Grid, Table , Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material"
import Head from "next/head"
import { GiCancel } from 'react-icons/gi'

export default function Transaction(){
    const router = useRouter()
    const { 
        TaskList , 
        amount , 
        customer , 
        duration , 
        location , 
        provider ,
        serviceType ,
        start_date  ,
        start_time ,
        _id ,
        TOC ,
        cancellation_reason
    } = router.query
    const [open,setOpen] = useState(false)

    const Conditions = (TOC) => {
        if(TOC.length > 0) {
            return TOC.map((value,index)=>{
                return (
                    <TableRow key = {index}>
                        <TableCell className = {styles.tbData}>{index+1}</TableCell>
                        <TableCell className = {styles.tbData}>{value.condition}</TableCell>
                        <TableCell className = {styles.tbData}>
                            <Typography className = {clsx({
                            [styles.LOWpriority] : value.priority === 'LOW' ,
                            [styles.MEDIUMpriority] : value.priority === 'MEDIUM' ,
                            [styles.HIGHpriority] : value.priority === 'HIGH' ,
                            })}>
                            {value.priority}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )
            })
        }
        else {
            return (
                <TableRow>
                    <TableCell colSpan={3}>
                        <center>
                            No Conditions set by Customer
                        </center>
                    </TableCell>
                </TableRow>
            )
        }
    }

    const month = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return (
        <>
            <Head>
                <title>
                    { `${_id} | Maid In` }
                </title>
            </Head>
            <Layout>
                <React.Fragment>
                    <Stack
                    direction = {'column'}
                    spacing = {2}
                    className = {styles.container}
                    >
                        <Stack
                        direction={'row'}
                        className = {styles.header}
                        >
                            <Typography style = {{ fontWeight : 'bolder' , fontSize : 'larger' , flex : 1 , textAlign : 'center' }}>
                                {_id}
                            </Typography>
                            <GiCancel 
                            onClick={() => setOpen(true)}
                            style={{ alignSelf : 'center' , cursor : 'pointer' }} size={20} color = {'black'}/>
                        </Stack>
                        <Grid justifyContent={'center'} alignItems={'center'} container>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData 
                                field = {'Start Date'} 
                                value = {`${
                                    (new Date(start_date)).getDate()
                                    } ${month[(new Date(start_date)).getMonth()]} ${(new Date(start_date)).getFullYear()} ${start_time}`}/>
                            </Grid>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData field = {'Service Type'} value = {serviceType}/>
                            </Grid>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData field = {'Customer'} value = {customer}/>
                            </Grid>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData field = {'Servicemen'} value = {provider}/>
                            </Grid>
                            <Grid lg = {4} md = {12} sm = {12} xs = {12} item>
                                <FieldData field = {'Service Location'} value = {location}/>
                            </Grid>
                        </Grid>
                        <Stack
                        direction = {'column'}
                        spacing = {2}
                        className = {styles.tbContainer}
                        >
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className = {styles.tbHead}>S-NO</TableCell>
                                            <TableCell className = {styles.tbHead}>Task</TableCell>
                                            <TableCell className = {styles.tbHead}>Hourly Wage</TableCell>
                                            <TableCell className = {styles.tbHead}>Duration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            TaskList && (JSON.parse(TaskList)).map((value,index)=>{
                                                return (
                                                    <TableRow key = {value._id}>
                                                        <TableCell className = {styles.tbData}>{index + 1}</TableCell>
                                                        <TableCell className = {styles.tbData}>{value.task}</TableCell>
                                                        <TableCell className = {styles.tbData}>{`${value.hourly_price}/PKR`}</TableCell>
                                                        <TableCell className = {styles.tbData}>{`${value.duration}/min`}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                        <TableRow style={{ backgroundColor : 'cornflowerblue' }}>
                                           <TableCell className = {styles.tbData}></TableCell>
                                            <TableCell className = {styles.tbData}></TableCell>
                                            <TableCell style = {{ fontWeight : 'bold' }} className = {styles.tbData}>
                                             {`${amount} PKR`}
                                            </TableCell>
                                            <TableCell style = {{ fontWeight : 'bold' }} className = {styles.tbData}>
                                                {`${duration}/min`}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className = {styles.tbHead}>S-NO</TableCell>
                                            <TableCell className = {styles.tbHead}>Condition</TableCell>
                                            <TableCell className = {styles.tbHead}>Priority</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        TOC && Conditions(JSON.parse(TOC))
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Stack>
                    <Dialog open = {open} onClose={() => setOpen(false)}>
                        <DialogTitle 
                        style={{ color : 'black' , fontFamily : 'cursive' , fontWeight : 'bold' , textAlign : 'center' }}>
                            Customer reason for Cancellation
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText 
                            style={{ 
                                color : 'black' , 
                                fontFamily : 'cursive' , 
                                border : '5px solid black' ,
                                padding : '10px' ,
                                textAlign : 'center'
                            }}>
                                { cancellation_reason }
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>
            </Layout>
        </>
    )
}