import Layout from "../../../Component/Layout";
import styles from '../../../styles/Pending.module.css';
import { IoIosInformationCircle } from 'react-icons/io'
import { FcApprove , FcDisapprove } from 'react-icons/fc'
import { FaUserCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import { useState } from "react";

export default function Pending(){
    const [showRef,setShowRef] = useState(false)
    return (
        <>
            <Layout>
                <div className = {styles.container}>
                    <div className = {styles.header}>
                        <p className = {styles.heading}>Pending Applications</p>
                    </div>
                    <div className = {styles.body}>
                        <table className = {styles.applicants}>
                            <tbody>
                                <tr>    
                                    <th className = {styles.tbHead}>S.NO</th>
                                    <th className = {styles.tbHead}>Full Name</th>
                                    <th className = {styles.tbHead}>Applied as</th>
                                    <th className = {styles.tbHead}>Date of Submission</th>
                                    <th className = {styles.tbHead}>References</th>
                                    <th className = {styles.tbHead}>Credentials submitted</th>
                                    <th className = {styles.tbHead}>Status</th>
                                </tr>
                                <tr>
                                    <td className = {styles.tbData}>1</td>
                                    <td className = {styles.tbData}>Poorab Gangwani</td>
                                    <td className = {styles.tbData}>Gardener</td>
                                    <td className = {styles.tbData}>{`3/3/2023 (5 days ago)`}</td>
                                    <td className = {styles.tbData}>
                                        <center>
                                            <IoIosInformationCircle 
                                            onClick={() => setShowRef(true)} 
                                            size={25} 
                                            style = {{ cursor : 'pointer' }} />
                                        </center>
                                    </td>
                                    <td className = {styles.tbData}>
                                        <button className = {styles.submittedBtn}>
                                            Submitted
                                        </button>
                                    </td>
                                    <td className = {styles.tbData}>
                                        <button className = {styles.statusBtn}>
                                            <FcApprove size={30}/>
                                        </button>
                                        <button className = {styles.statusBtn}>
                                            <FcDisapprove size={30}/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Modal
                    isOpen = {showRef}
                    onRequestClose={() => setShowRef(false)}
                    className={styles.modal}
                    >
                        <table>
                            <tbody>
                                <tr className = {styles.refRow}>
                                    <th className = {styles.tbHead}>S.No</th>
                                    <th className = {styles.tbHead}>Name</th>
                                    <th className = {styles.tbHead}>Occupation</th>
                                    <th className = {styles.tbHead}>Contact</th>
                                    <th className = {styles.tbHead}>Email Address</th>
                                </tr>
                                <tr className = {styles.refRow}>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>1</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Ajay Singh</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Doctor</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>03350297333</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>poorabgangwani19@gmail.com</td>
                                </tr>
                                <tr className = {styles.refRow}>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>1</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Ajay Singh</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Doctor</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>03350297333</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>poorabgangwani19@gmail.com</td>
                                </tr>
                                <tr className = {styles.refRow}>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>1</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Ajay Singh</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Doctor</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>03350297333</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>poorabgangwani19@gmail.com</td>
                                </tr>
                                <tr className = {styles.refRow}>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>1</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Ajay Singh</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>Doctor</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>03350297333</td>
                                    <td className = {styles.tbData} style = {{ backgroundColor : 'wheat' }}>poorabgangwani19@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal>
                </div>
            </Layout>
        </>
    )
}