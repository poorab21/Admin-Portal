import { useRouter } from "next/router";
import Layout from "../../../../Component/Layout";
import styles from '../../../../styles/Servicemen.module.css'
import { FaUserCircle } from 'react-icons/fa'
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal'
import { useMutation } from "react-query";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import FieldData from "../../../../Component/FieldData";

export default function servicemen(){
    const router = useRouter()
    const [showPic,setShowPic] = useState(false)

    const { mutate , data : userImg , isLoading } = useMutation((data)=>{
        return axios.post('http://localhost:3000/api/Servicemen/userImg',data)
    })

    useEffect(()=>{
        mutate({ servicemenID : router.query.id })
    },[])
    
    return (
        <Layout>
            <React.Fragment>
                <Stack
                direction = {'column'}
                spacing = {2}
                className = {styles.container}
                >   
                    <Stack
                    direction={'row'}
                    >
                        <Typography className = {styles.heading}>{router.query.servicemenID}</Typography>
                    </Stack>
                    <Avatar className = {styles.userImg}>
                        <FaUserCircle 
                        size={150} 
                        style={{ cursor : 'pointer' }} 
                        onClick={ isLoading ? null : () => setShowPic(true)}/>
                    </Avatar>
                    
                    <Grid container>
                        <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'First-Name'} value = {router.query.firstname}/>
                        </Grid>
                        <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'Last-Name'} value = {router.query.lastname}/>
                        </Grid>
                        <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'Service Type'} value = {router.query.serviceType}/>
                        </Grid>
                        <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'Work Experience'} value = {`${router.query.experience} Year/s`}/>
                        </Grid>
                        <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'CNIC'} value = {router.query.cnic}/>
                        </Grid>
                        <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'Contact'} value = {router.query.contact}/>
                        </Grid>
                        <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'Email Address'} value = {router.query.email}/>
                        </Grid>
                        <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                            <FieldData field = {'Date of Registration'} value = {router.query.registration_date}/>
                        </Grid>
                    </Grid>
                </Stack>
                <Modal
                isOpen = {showPic}
                onRequestClose={() => setShowPic(false)}
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
                        alt={'Servicemen Picture'}
                        />
                        :
                        <p style={{ height : '100%' , textAlign : 'center' , paddingTop : '50%' }}>
                            No Profile Picture
                        </p>
                    }
                </Modal>
            </React.Fragment>
        </Layout>
    )
}