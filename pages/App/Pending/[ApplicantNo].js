import { useRouter } from "next/router";
import Layout from "../../../Component/Layout";
import styles from '../../../styles/Applicant.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { VscReferences } from 'react-icons/vsc'
import Modal  from 'react-modal'
import { useState } from "react";
import useSWR from 'swr'
import axios from "axios";
import Image from "next/image";
import { useMutation } from "react-query";

export default function Applicant(){
    const router = useRouter()
    const { 
        id ,
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
    
    const { data : userImg , isLoading } = useMutation((data)=>{
        return axios.post('http://localhost:3000/api/Pending/userImg',data)
    })
    
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.applicantName}>
                        {`Applicant #${router.query.ApplicantNo}`}
                    </p>
                    <p className = {styles.referenceIcon}>
                        <VscReferences onClick={() => setShowRef(true)} size={30}/>
                    </p>
                </div>
                <div className = {styles.applicant}>
                    <FaUserCircle 
                    size={150} 
                    style={{ cursor : 'pointer' }} 
                    onClick={ isLoading ? null : () => setShowPic(true)}/>
                </div>
                <div className = {styles.application}>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>First Name</legend>
                        <p className = {styles.value}>{firstname}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Last Name</legend>
                        <p className = {styles.value}>{lastname}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Applied as</legend>
                        <p className = {styles.value}>{serviceType}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Experience</legend>
                        <p className = {styles.value}>{`${experience} Year/s`}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>CNIC</legend>
                        <p className = {styles.value}>{cnic}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Contact</legend>
                        <p className = {styles.value}>{contact}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Email Address</legend>
                        <p className = {styles.value}>{email}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Submission Date</legend>
                        <p className = {styles.value}>{registration_date}</p>
                    </fieldset>
                </div>
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
                                                    {value.occupation}
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
                        alt={'Applicant Picture'}
                        />
                        :
                        <p style={{ height : '100%' , textAlign : 'center' , paddingTop : '50%' }}>
                            No Profile Picture
                        </p>
                    }
                </Modal>
            </div>
        </Layout>
    )
}