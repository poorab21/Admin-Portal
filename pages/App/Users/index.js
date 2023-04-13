import { useState } from 'react'
import Layout from '../../../Component/Layout'
import styles from '../../../styles/Users.module.css'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function Users(){
    const [userType,setUserType] = useState('Servicemen')
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.heading}>{userType}</p>
                    <select className = {styles.filter} value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option>Servicemen</option>
                        <option>Seeker</option>
                    </select>
                </div>
                <hr/>
                <div className = {styles.body}>
                    <table className = {styles.table}>
                        <tbody>
                            <tr>
                                <th className = {styles.tbHead}>ID</th>
                                <th className = {styles.tbHead}>Name</th>
                                <th className = {styles.tbHead}>Date of Registration</th>
                                <th className = {styles.tbHead}>Profile</th>
                                <th className = {styles.tbHead}>status</th>
                            </tr>
                            <tr>
                                <td className = {styles.tbData}>jdkjasdnvdvnsdjv</td>
                                <td className = {styles.tbData}>Poorab Gangwani</td>
                                <td className = {styles.tbData}>1/11/2023</td>
                                <td className = {styles.tbData}>
                                    <center>
                                        <AiFillInfoCircle style = {{ cursor : 'pointer' }} size={30}/>
                                    </center>
                                </td>
                                <td className = {styles.tbData}>
                                    <button className = {styles.statusBtn}>
                                        Status
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className = {styles.tbData}>jdkjasdnvdvnsdjv</td>
                                <td className = {styles.tbData}>Poorab Gangwani</td>
                                <td className = {styles.tbData}>1/11/2023</td>
                                <td className = {styles.tbData}>
                                    <center>
                                        <AiFillInfoCircle style = {{ cursor : 'pointer' }} size={30}/>
                                    </center>
                                </td>
                                <td className = {styles.tbData}>
                                    <button className = {styles.statusBtn}>
                                        Status
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className = {styles.tbData}>jdkjasdnvdvnsdjv</td>
                                <td className = {styles.tbData}>Poorab Gangwani</td>
                                <td className = {styles.tbData}>1/11/2023</td>
                                <td className = {styles.tbData}>
                                    <center>
                                        <AiFillInfoCircle style = {{ cursor : 'pointer' }} size={30}/>
                                    </center>
                                </td>
                                <td className = {styles.tbData}>
                                    <button className = {styles.statusBtn}>
                                        Status
                                    </button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}