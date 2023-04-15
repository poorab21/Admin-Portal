import { useRouter } from "next/router";
import Layout from "../../../../Component/Layout";
import styles from '../../../../styles/Servicemen.module.css'
import { FaUserCircle } from 'react-icons/fa'

export default function servicemen(){
    const router = useRouter()
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
                        <FaUserCircle size={120}/>
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
            </div>
        </Layout>
    )
}