import { useRouter } from 'next/router'
import styles from '../../../../styles/Seeker.module.css'
import Layout from '../../../../Component/Layout'
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios'
import Image from 'next/image'
import Modal  from 'react-modal'
import React, { useState , useEffect } from 'react'
import { useMutation } from 'react-query'
import { Stack, Typography , Avatar, Grid } from '@mui/material'
import FieldData from '../../../../Component/FieldData'
import Head from 'next/head'

export default function Seeker(){
    const router = useRouter()
    const [showImg,setShowImg] = useState(false)

    const { mutate , data : userImg , isLoading } = useMutation((data)=>{
        return axios.post('http://localhost:3000/api/Seeker/userImg',data)
    })

    useEffect(()=>{
        mutate({ seekerID : router.query.id })
    },[])
        
    return (
        <React.Fragment>
            <Head>
                <title>
                    {`${router.query.firstname} ${router.query.lastname} (Seeker) | Maid In`}
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
                        direction = {'row'}
                        className = {styles.header}
                        >
                            <Typography className = {styles.heading}>{router.query.seekerID}</Typography>
                        </Stack>
                        <Avatar className = {styles.userImg}>
                            <FaUserCircle 
                            size={150} 
                            style={{ cursor : 'pointer' }} 
                            onClick={ isLoading ? null : () => setShowImg(true)}/>
                        </Avatar>
                        <Grid container>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'First-Name'} value = {router.query.firstname} />
                            </Grid>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Last-Name'} value = {router.query.lastname} />
                            </Grid>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Contact'} value = {router.query.contact} />
                            </Grid>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Email'} value = {router.query.email} />
                            </Grid>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Occupation'} value = {router.query.occupation} />
                            </Grid>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Date of Registration'} value = {router.query.registration_date} />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Modal
                    isOpen = {showImg}
                    onRequestClose={() => setShowImg(false)}
                    style={{
                        content : {
                            margin : 'auto' ,
                            height : '400px' ,
                            width : '350px'
                        }
                    }}
                    ariaHideApp = {false}
                    >
                        {
                            userImg?.data?.image?.img ? 
                            <Image
                            src={`data:${userImg.data.image.imgtype};base64,${userImg.data.image.img}`}
                            width={300}
                            height={150}
                            alt={'Seeker Picture'}
                            />
                            :
                            <p style={{ height : '100%' , textAlign : 'center' , paddingTop : '50%' }}>
                                No Profile Picture
                            </p>
                        }
                    </Modal>
                </React.Fragment>
            </Layout>
        </React.Fragment>
    )
}