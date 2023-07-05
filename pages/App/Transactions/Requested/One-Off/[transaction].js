import { useRouter } from "next/router"
import styles from '../../../../../styles/OneOff.module.css'
import Layout from "../../../../../Component/Layout"
import FieldData from "../../../../../Component/FieldData"
import clsx from "clsx"
import React from "react"
import { 
    TableRow , 
    TableCell , 
    Table , 
    TableContainer , 
    TableHead , 
    TableBody , 
    Typography ,
    Stack , 
    Grid
} from "@mui/material"
import Head from "next/head"

export default function Transaction(){
    const router = useRouter()
    const { 
        TaskList , 
        amount , 
        customer , 
        duration , 
        location ,
        serviceType ,
        start_date  ,
        start_time ,
        TOC
    } = router.query

    const Conditions = (TOC) => {
        if(TOC.length > 0) {
            return TOC.map((value,index)=>{
                return (
                    <TableRow key = {value._id}>
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
                    {`One-Off Request ${router.query.transaction} | Maid In`}
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
                            <Typography className = {styles.heading}>{`One-Off Request #${router.query.transaction}`}</Typography>
                        </Stack>
                        <Grid justifyContent={'center'} alignItems={'center'} container>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData 
                                field = {'Start Date'} 
                                value = {`${
                                    (new Date(start_date)).getDate()
                                    } ${month[(new Date(start_date)).getMonth()]} ${(new Date(start_date)).getFullYear()} ${start_time}`}
                                    />
                            </Grid>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData field = {'Service Type'} value = {serviceType}/>
                            </Grid>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData field = {'Customer'} value = {customer}/>
                            </Grid>
                            <Grid lg = {2} md = {3} sm = {6} xs = {12} item>
                                <FieldData field = {'Servicemen'} value = {'Not Assigned Yet'}/>
                            </Grid>
                            <Grid lg = {4} md = {12} sm = {12} xs = {12} item>
                                <FieldData 
                                field = {'Service Location'} 
                                value = {location}/>
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
                </React.Fragment>
            </Layout>
        </>
    )
}