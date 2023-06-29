import { useRouter } from "next/router";
import Layout from "../../../Component/Layout";
import styles from '../../../styles/Applicant.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { VscReferences } from 'react-icons/vsc'
import Modal  from 'react-modal'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useMutation } from "react-query";
import { Avatar , Grid, IconButton, Stack, Typography } from "@mui/material";
import FieldData from "../../../Component/FieldData";
import { mutate } from "swr";
import Head from "next/head";

export default function Applicant(){
    const router = useRouter()
    const { 
        firstname , 
        lastname ,
        email ,
        contact ,
        serviceType ,
        experience ,
        cnic ,
        references ,
        registration_date
        } = router.query 
    let References = references && JSON.parse(references)
    const [showRef,setShowRef] = useState(false)
    const [showPic,setShowPic] = useState(false)

    const { data : userImg , isLoading , mutate } = useMutation((data)=>{
        return axios.post('http://localhost:3000/api/Pending/userImg',data)
    })
    useEffect(()=>{
         router.isReady ?  mutate({ servicemenID : router.query.id }) : null
    },[router.isReady])
    
    return (
        <React.Fragment>
            <Head>
                <title>
                    {`${router.query.firstname} ${router.query.lastname} (Applicant) | Maid In`}
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
                        alignItems={'center'}
                        >
                            <Typography className = {styles.heading}>{`Applicant #${router.query.ApplicantNo}`}</Typography>
                            <IconButton className = {styles.refBtn} onClick={() => setShowRef(true)}>
                                <VscReferences color = {'white'} size={30}/>
                            </IconButton>
                        </Stack>

                        <Avatar className = {styles.imgContainer} onClick={ isLoading ? null : () => setShowPic(true)} variant="round">
                            <FaUserCircle 
                            size={150}
                            color = {'cornflowerblue'}
                            style={{ cursor : 'pointer' , backgroundColor : 'white' }} 
                            />
                        </Avatar>

                        <Grid container>
                            <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'First-Name'} value = {firstname}/>
                            </Grid>
                            <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Last-Name'} value = {lastname}/>
                            </Grid>
                            <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Applied as'} value = {serviceType}/>
                            </Grid>
                            <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Experience'} value = {`${experience} Year/s`}/>
                            </Grid>
                            <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'CNIC'} value = {cnic}/>
                            </Grid>
                            <Grid lg = {4} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Contact'} value = {contact}/>
                            </Grid>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Email Address'} value = {email}/>
                            </Grid>
                            <Grid lg = {6} md = {6} sm = {6} xs = {12} item>
                                <FieldData field = {'Date of Submission'} value = {registration_date}/>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Modal
                    isOpen = {showRef}
                    onRequestClose={() => setShowRef(false)}
                    style={{
                        content : {
                            margin : 'auto' ,
                            height : '200px' ,
                            width : '350px'
                        }
                    }}
                    ariaHideApp = {false}
                    >
                        <div className = {styles.modalContainer}>
                            <p style={{ textAlign : 'center' , fontWeight : 'bold' , fontStyle : 'italic' , fontSize : 'large' }}>
                                References
                            </p>
                            <hr/>
                            <div className = {styles.references}>
                                {
                                    References?.map((value,index)=>{
                                        return (
                                            <div key={index} className = {styles.reference}>
                                                <FaUserCircle size={70} style={{ flex : 1 , alignSelf : 'center' }} color = {'white'} />
                                                <div className = {styles.refInfo}>
                                                    <p style = {{ fontWeight : 'bold' , fontStyle : 'italic' , textAlign : 'center' , fontSize : '12px'}}>
                                                        {value.name}
                                                    </p>
                                                    <p style = {{ fontWeight : 'bold' , fontStyle : 'italic' , textAlign : 'center' , fontSize : '12px'}}>
                                                        {value.contact}
                                                    </p>
                                                    <p style = {{ fontWeight : 'bold' , fontStyle : 'italic' , textAlign : 'center' , fontSize : '12px'}}>
                                                        {value.email}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }   
                            </div>
                        </div>
                    </Modal>
                    <Modal
                    isOpen = {showPic}
                    onRequestClose={() => setShowPic(false)}
                    style={{
                        content : {
                            margin : 'auto' ,
                            height : '380px' ,
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
                            alt={'Applicant Picture'}
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