import { useRouter } from 'next/router'
import styles from '../../../../styles/Seeker.module.css'
import Layout from '../../../../Component/Layout'
import { FaUserCircle } from 'react-icons/fa'

export default function Seeker(){
    const router = useRouter()
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p>{router.query.seekerID}</p>
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
                        <legend className = {styles.heading}>Contact</legend>
                        <p className = {styles.value}>03350298574</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Email</legend>
                        <p className = {styles.value}>poorabgangwani19@gmail.com</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Occupation</legend>
                        <p className = {styles.value}>Student</p>
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
