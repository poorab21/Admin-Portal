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

Chart.register(ArcElement,Tooltip,Legend)

export default function Dashboard(){
    return (
        <Layout>
            <Grid style={{ overflow : 'auto' }} container>
                <Grid className = {styles.container} container justifyContent={'center'}>
                    <Grid height={'fit-content'} item lg = {2} md = {2}  sm = {4}  xs = {12}>
                        <DataBox userType = {'Maids'} IconComponent = { () => <Kitchen/> }  value = {19}/>
                    </Grid>
                    <Grid item height={'fit-content'} lg = {2} md = {2}  sm = {4} xs = {12}>
                        <DataBox userType = {'Cleaners'} IconComponent = { () => <CleaningServices/> }  value = {20}/>
                    </Grid>
                    <Grid item height={'fit-content'} lg = {2} md = {2} sm = {4} xs = {12}>
                        <DataBox userType = {'Electricians'} IconComponent = { () => <ElectricalServices/> }  value = {31}/>
                    </Grid>
                    <Grid item height={'fit-content'} lg = {2} md = {2} sm = {6} xs = {12}>
                        <DataBox userType = {'Gardeners'} IconComponent = { () => <Forest/> }  value = {20}/>
                    </Grid>
                    <Grid item lg = {2} md = {2} sm = {6} xs = {12}>
                        <DataBox userType = {'User Accounts'} IconComponent = { () => <AccountBox/> }  value = {14}/>
                    </Grid>
                    <Grid className = {styles.ProgressBarContainer} item lg = {6} md = {6} sm = {12} xs = {12}>
                        <Typography 
                        style={{ fontStyle : 'italic' , fontFamily : 'fantasy' , textAlign : 'center' }}>
                            One-Off Transactions
                        </Typography>
                        <ProgressBar 
                        completed = {60} 
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
                        completed = {70} 
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
                                data : [12,3] ,
                                backgroundColor : ['yellow','lime']
                            }]
                        }}
                        />
                    </Grid>
                    <Grid style={{ width : '300px' , height : '300px' }} className = {styles.pie} item lg = {4} md = {4} sm = {6} xs = {12}>
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
                                    data : [2,3,4,5] ,
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
                            <DataBox userType = {'New Servicemen This Month'} IconComponent = { () => <Handshake/> }  value = {29}/>
                            <DataBox userType = {'New Seekers This Month'} IconComponent = { () => <Handshake/> }  value = {29}/>
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
                                        <TableCell className = {styles.tbHead}>Date of Submission</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className = {styles.tbBody}>1</TableCell>
                                        <TableCell className = {styles.tbBody}>This is my Grievance This is my Grievance This is my Grievance This is my Grievance This is my Grievance This is my Grievance</TableCell>
                                        <TableCell className = {styles.tbBody}>Poorab Gangwani (Customer)</TableCell>
                                        <TableCell className = {styles.tbBody}>19 May 2023</TableCell>
                                    </TableRow>
                                                                        <TableRow>
                                        <TableCell className = {styles.tbBody}>1</TableCell>
                                        <TableCell className = {styles.tbBody}>This is my Grievance This is my Grievance This is my Grievance This is my Grievance This is my Grievance This is my Grievance</TableCell>
                                        <TableCell className = {styles.tbBody}>Poorab Gangwani (Customer)</TableCell>
                                        <TableCell className = {styles.tbBody}>19 May 2023</TableCell>
                                    </TableRow>
                                                                        <TableRow>
                                        <TableCell className = {styles.tbBody}>1</TableCell>
                                        <TableCell className = {styles.tbBody}>This is my Grievance This is my Grievance This is my Grievance This is my Grievance This is my Grievance This is my Grievance</TableCell>
                                        <TableCell className = {styles.tbBody}>Poorab Gangwani (Customer)</TableCell>
                                        <TableCell className = {styles.tbBody}>19 May 2023</TableCell>
                                    </TableRow>
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