import { useRouter } from "next/router";
import Layout from "../../../Component/Layout";
import styles from '../../../styles/Applicant.module.css'
import { FaUserCircle } from 'react-icons/fa'

export default function Applicant(){
    const router = useRouter()
    const { 
        firstname , 
        lastname ,
        email ,
        contact ,
        serviceType ,
        experience ,
        cnic
         } = router.query
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.applicantName}>
                        {`Applicant #${router.query.ApplicantNo}`}
                    </p>
                </div>
                <div className = {styles.applicant}>
                    <FaUserCircle size={150}/>
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
                    <fieldset className = {styles.field} style = {{ gridColumnEnd : 'span 2' }}>
                        <legend className = {styles.heading}>Email Address</legend>
                        <p className = {styles.value}>{email}</p>
                    </fieldset>
                    
                </div>
            </div>
        </Layout>
    )
}