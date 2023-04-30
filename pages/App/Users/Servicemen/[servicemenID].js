import { useRouter } from "next/router";
import Layout from "../../../../Component/Layout";
import styles from '../../../../styles/Servicemen.module.css'
import { FaUserCircle } from 'react-icons/fa'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from 'react-modal'
import { useMutation } from "react-query";

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
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p>
                        {router.query.servicemenID}
                    </p>
                </div>
                <div className = {styles.body}>
                    <div className = {styles.img}>
                        <FaUserCircle 
                        size={150} 
                        style={{ cursor : 'pointer' }} 
                        onClick={ isLoading ? null : () => setShowPic(true)}/>
                    </div>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>First Name</legend>
                        <p className = {styles.value}>{router.query.firstname}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Last Name</legend>
                        <p className = {styles.value}>{router.query.lastname}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>CNIC</legend>
                        <p className = {styles.value}>{router.query.cnic}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Contact</legend>
                        <p className = {styles.value}>{router.query.contact}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Work Experience</legend>
                        <p className = {styles.value}>{`${router.query.experience} Year/s`}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Service Type</legend>
                        <p className = {styles.value}>{router.query.serviceType}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Email Address</legend>
                        <p className = {styles.value}>{router.query.email}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Date of Registration</legend>
                        <p className = {styles.value}>{router.query.registration_date}</p>
                    </fieldset>
                </div>
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
            </div>
        </Layout>
    )
}