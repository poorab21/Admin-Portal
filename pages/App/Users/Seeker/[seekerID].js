import { useRouter } from 'next/router'
import styles from '../../../../styles/Seeker.module.css'
import Layout from '../../../../Component/Layout'
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios'
import Image from 'next/image'
import Modal  from 'react-modal'
import { useState , useEffect } from 'react'
import { useMutation } from 'react-query'

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
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p>{router.query.seekerID}</p>
                </div>
                <div className = {styles.body}>
                    <div className = {styles.img}>
                        <FaUserCircle 
                        size={150} 
                        style={{ cursor : 'pointer' }} 
                        onClick={isLoading ? null : () => setShowImg(true)}/>
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
                        <legend className = {styles.heading}>Contact</legend>
                        <p className = {styles.value}>{router.query.contact}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Email</legend>
                        <p className = {styles.value}>{router.query.email}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Occupation</legend>
                        <p className = {styles.value}>{router.query.occupation}</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Date of Registration</legend>
                        <p className = {styles.value}>{router.query.registration_date}</p>
                    </fieldset>
                </div>
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
            </div>
        </Layout>
    )
}
