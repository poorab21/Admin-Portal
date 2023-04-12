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
                        <p className = {styles.value}>Poorab</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Last Name</legend>
                        <p className = {styles.value}>Gangwani</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>CNIC</legend>
                        <p className = {styles.value}>11111-1111111-1</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Contact</legend>
                        <p className = {styles.value}>03350298574</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Work Experience</legend>
                        <p className = {styles.value}>5 Year/s</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Service Type</legend>
                        <p className = {styles.value}>Cleaner</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Email Address</legend>
                        <p className = {styles.value}>poorabgangwani19@gmail.com</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Date of Registration</legend>
                        <p className = {styles.value}>Date Value</p>
                    </fieldset>
                </div>
            </div>
        </Layout>
    )
}