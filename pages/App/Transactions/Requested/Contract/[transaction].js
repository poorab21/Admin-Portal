import { useRouter } from "next/router"
import Layout from "../../../../../Component/Layout"
import styles from '../../../../../styles/Contract.module.css'
import FieldData from "../../../../../Component/FieldData"
import clsx from "clsx"
import moment from "moment/moment"
import { 
    Table , 
    TableHead , 
    TableBody , 
    TableCell , 
    TableRow ,
    Typography , 
    Grid , 
    Stack , 
    TableContainer
} from "@mui/material"
import React from "react"
import Head from "next/head"

export default function Transaction(){
    const router = useRouter()
    const {
        TOC ,
        customer ,
        end_hours ,
        location , 
        months ,
        montly_wage ,
        serviceType ,
        start_date ,
        start_hour ,
    } = router.query
    const month = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let endDate = new Date(start_date)
    endDate = moment(endDate).add(months,'months').toDate()

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

    return (
        <>
            <Head>
                <title>
                    {`Contract Request ${router.query.transaction} | Maid In`}
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
                            {`Contract Request #${router.query.transaction}`}
                        </Typography>
                        <Grid className = {styles.userInfo} container>
                            <Grid lg = {4} md = {4} sm = {6} xs = {12} item>
                                <FieldData field = {'Contract Duration'} value = {`${
                                    (new Date(start_date)).getDate()} ${month[(new Date(start_date)).getMonth()]} ${
                                    (new Date(start_date)).getFullYear()} - ${endDate.getDate()} ${
                                    month[endDate.getMonth()]} ${ endDate.getFullYear() }`} />
                            </Grid>
                            <Grid lg = {4} md = {4} sm = {6} xs = {12} item>
                                <FieldData field = {'Work Hours'} value = {`${start_hour} - ${end_hours}`} />
                            </Grid>
                            <Grid lg = {4} md = {4} sm = {6} xs = {12} item>
                                <FieldData field = {'Monthly Wage'} value = {`${montly_wage} PKR`} />
                            </Grid>
                            <Grid lg = {4} md = {4} sm = {6} xs = {12} item>
                                <FieldData field = {'Service Type'} value = {serviceType} />
                            </Grid>
                            <Grid lg = {4} md = {4} sm = {6} xs = {12} item>
                                <FieldData field = {'Customer'} value = {customer} />
                            </Grid>
                            <Grid lg = {4} md = {4} sm = {6} xs = {12} item>
                                <FieldData field = {'Serviceman'} value = {'Not Assigned Yet'} />
                            </Grid>
                            <Grid lg = {12} md = {12} sm = {12}  xs = {12} item>
                                <FieldData field = {'Service Location'} value = {location} /> 
                            </Grid>
                        </Grid>
                        <TableContainer className = {styles.tb}>
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
                </React.Fragment>
            </Layout>
        </>
    )
}