import DataBox from '../../Component/DataBox'
import Layout from '../../Component/Layout'
import Grid from '@mui/material/Grid'
import Kitchen from '@mui/icons-material/Kitchen'
import CleaningServices from '@mui/icons-material/CleaningServices'
import ElectricalServices from '@mui/icons-material/ElectricalServices'
import Forest from '@mui/icons-material/Forest'
import AccountBox from '@mui/icons-material/AccountBox'
import { Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import ProgressBar from '@ramonak/react-progress-bar'
import styles from '../../styles/Dashboard.module.css'
import { Chart , ArcElement , Tooltip , Legend } from 'chart.js' 
import { Pie } from 'react-chartjs-2'
import Handshake from '@mui/icons-material/Handshake'
import useSWR from 'swr'
import { Atom } from 'react-loading-indicators'
import axios from 'axios'

Chart.register(ArcElement,Tooltip,Legend)

export default function Dashboard(){

    const fetcher = () => {
        return axios.get(`http://localhost:3000/api/Dashboard`)
    }

    const { isLoading , data } = useSWR('Dashboard',fetcher,{
        refreshInterval : 60000
    })
    
    if(isLoading) return (
        <div className = {styles.spinnerContainer}>
            <Atom size = {'small'} color={'cornflowerblue'}  />
        </div>
    )

    return (
        <Layout>
            <Grid style={{ overflow : 'auto' }} container>
                <Grid className = {styles.container} container justifyContent={'center'}>
                    <Grid height={'fit-content'} item lg = {2} md = {2}  sm = {4}  xs = {12}>
                        <DataBox 
                        userType = {'Maids'} 
                        IconComponent = { () => <Kitchen/> }  
                        value = {data?.data?.dashboard_data?.servicemen_result?.maids}/>
                    </Grid>
                    <Grid item height={'fit-content'} lg = {2} md = {2}  sm = {4} xs = {12}>
                        <DataBox 
                        userType = {'Cleaners'} 
                        IconComponent = { () => <CleaningServices/> }  
                        value = {data?.data?.dashboard_data?.servicemen_result?.cleaners}/>
                    </Grid>
                    <Grid item height={'fit-content'} lg = {2} md = {2} sm = {4} xs = {12}>
                        <DataBox 
                        userType = {'Electricians'} 
                        IconComponent = { () => <ElectricalServices/> }  
                        value = {data?.data?.dashboard_data?.servicemen_result?.electricians}/>
                    </Grid>
                    <Grid item height={'fit-content'} lg = {2} md = {2} sm = {6} xs = {12}>
                        <DataBox 
                        userType = {'Gardeners'} 
                        IconComponent = { () => <Forest/> }  
                        value = {data?.data?.dashboard_data?.servicemen_result?.gardeners}/>
                    </Grid>
                    <Grid item lg = {2} md = {2} sm = {6} xs = {12}>
                        <DataBox
                        userType = {'User Accounts'} 
                        IconComponent = { () => <AccountBox/> }  
                        value = {data?.data?.dashboard_data?.seeker_result?.totalSeekers}/>
                    </Grid>
                    <Grid className = {styles.ProgressBarContainer} item lg = {6} md = {6} sm = {12} xs = {12}>
                        <Typography 
                        style={{ fontStyle : 'italic' , fontFamily : 'fantasy' , textAlign : 'center' }}>
                            One-Off Transactions
                        </Typography>
                        <ProgressBar 
                        completed = {
                            ((data?.data?.dashboard_data?.transaction_result?.OneOff?.successful
                            /
                            (data?.data?.dashboard_data?.transaction_result?.OneOff?.unsuccessful
                            +
                            data?.data?.dashboard_data?.transaction_result?.OneOff?.successful))*100).toFixed(2)
                        } 
                        className = {styles.progressbar}
                        baseBgColor='red'
                        bgColor='lime'
                        />
                    </Grid>
                    <Grid className = {styles.ProgressBarContainer} item lg = {6} md = {6} sm = {12} xs = {12}>
                        <Typography 
                        style={{ fontStyle : 'italic' , fontFamily : 'fantasy' , textAlign : 'center' }}>
                            Contract Transactions
                        </Typography>
                        <ProgressBar 
                        completed = {
                            ((data?.data?.dashboard_data?.transaction_result?.contract?.successful
                            /
                            (data?.data?.dashboard_data?.transaction_result?.contract?.unsuccessful
                            +
                            data?.data?.dashboard_data?.transaction_result?.contract?.successful))*100).toFixed(2)
                        } 
                        className = {styles.progressbar}
                        baseBgColor='red'
                        bgColor='lime'
                        />
                    </Grid>
                    <Grid style={{ width : '300px' , height : '300px' }} item lg = {4} md = {4} sm = {6} xs = {12}>
                        <Typography
                        style={{ fontStyle : 'italic' , fontFamily : 'fantasy' , textAlign : 'center' }}
                        >
                            Total Revenue Generated
                        </Typography>
                        <Pie
                        options={{
                            maintainAspectRatio : false 
                        }}
                        data = {{
                            labels : ['Contract Transactions','One-Off Transactions'] , 
                            datasets : [{
                                data : [
                                    data?.data?.dashboard_data?.transaction_result?.contract?.revenue ,
                                    data?.data?.dashboard_data?.transaction_result?.OneOff?.revenue
                                ] ,
                                backgroundColor : ['yellow','lime']
                            }]
                        }}
                        />
                    </Grid>
                    <Grid 
                    style={{ width : '300px' , height : '300px' }} 
                    className = {styles.pie} item lg = {4} md = {4} sm = {6} xs = {12}>
                        <Typography 
                        style={{ fontStyle : 'italic' , fontFamily : 'fantasy' , textAlign : 'center' }}
                        >
                            Revenue by Service Type
                        </Typography>
                        <Pie
                        options={{ maintainAspectRatio : false }}
                        data={{
                                labels : ['Gardener','Electrician','Maid','Cleaner'] ,
                                datasets : [{
                                    data : [
                                        data?.data?.dashboard_data?.transaction_result?.service_revenue?.Gardener ,
                                        data?.data?.dashboard_data?.transaction_result?.service_revenue?.Electrician ,
                                        data?.data?.dashboard_data?.transaction_result?.service_revenue?.Maid ,
                                        data?.data?.dashboard_data?.transaction_result?.service_revenue?.Cleaner
                                    ] ,
                                    backgroundColor : ['yellow','lime','orange','purple']
                                }]
                            }}
                        />
                    </Grid>
                    <Grid style={{ marginTop : 'auto' , marginBottom : 'auto' }} item lg = {4} md = {4} sm = {12} xs = {12}>
                        <Stack
                        direction = {'column'}
                        justifyContent={'center'}
                        spacing = {2}
                        style={{ marginTop : 20 }}
                        >
                            <DataBox 
                            userType = {'New Servicemen This Month'} 
                            IconComponent = { () => <Handshake/> }  
                            value = {data?.data?.dashboard_data?.servicemen_result?.newServicemen}/>
                            <DataBox 
                            userType = {'New Seekers This Month'} 
                            IconComponent = { () => <Handshake/> }  
                            value = {data?.data?.dashboard_data?.seeker_result?.newSeekers}/>
                        </Stack>
                    </Grid>
                    <Grid item lg = {12}>
                        <Stack
                    direction={'column'}
                    spacing={2}
                    >
                        <Divider style={{ border : '1px solid black' , width : '100%' , marginTop : 10 }} />
                        <Typography className = {styles.recentGrievances}>Recent Grievances</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead style = {{ backgroundColor : "cornflowerblue" }}>
                                    <TableRow>
                                        <TableCell className = {styles.tbHead}>S-NO</TableCell>
                                        <TableCell className = {styles.tbHead}>Grievance</TableCell>
                                        <TableCell className = {styles.tbHead}>Made By</TableCell>
                                        <TableCell className = {styles.tbHead}>User Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data?.data?.dashboard_data?.grievances_result.map((value,index)=>{
                                            return (
                                            <TableRow key={index}>
                                                <TableCell className = {styles.tbBody}>
                                                    { index + 1 }
                                                </TableCell>
                                                <TableCell className = {styles.tbBody}>
                                                    { value.message }
                                                </TableCell>
                                                <TableCell className = {styles.tbBody}>
                                                    { value.sender }
                                                </TableCell>
                                                <TableCell className = {styles.tbBody}>
                                                    { value.usertype }
                                                </TableCell>
                                            </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}