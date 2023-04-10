import Layout from "../../../Component/Layout";
import styles from '../../../styles/Applicant.module.css'
import { FaUserCircle } from 'react-icons/fa'
import FieldData from '../../../Component/FieldData'

export default function Applicant(){
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.applicantName}>Applicant Number</p>
                </div>
                <div className = {styles.applicant}>
                    <FaUserCircle size={150}/>
                </div>
                <div className = {styles.application}>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>First Name</legend>
                        <p className = {styles.value}>Poorab</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Last Name</legend>
                        <p className = {styles.value}>Gangwani</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Applied as</legend>
                        <p className = {styles.value}>Maid</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Experience</legend>
                        <p className = {styles.value}>8 Year/s</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>CNIC</legend>
                        <p className = {styles.value}>11111-1111111-1</p>
                    </fieldset>
                    <fieldset className = {styles.field}>
                        <legend className = {styles.heading}>Contact</legend>
                        <p className = {styles.value}>03350298574</p>
                    </fieldset>
                    <fieldset className = {styles.field} style = {{ gridColumnEnd : 'span 2' }}>
                        <legend className = {styles.heading}>Email Address</legend>
                        <p className = {styles.value}>poorabgangwani19@gmail.com</p>
                    </fieldset>
                    
                </div>
            </div>
        </Layout>
    )
}