import styles from '../styles/Nav.module.css'
import Image from 'next/image'
import { RxDashboard } from 'react-icons/rx'
import { FiUsers } from 'react-icons/fi'
import { GrTransaction , GrServices } from 'react-icons/gr'
import { BiPhoneCall } from 'react-icons/bi'
import { BsFillArrowLeftCircleFill , BsFillArrowRightCircleFill } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'
import { MdPending } from 'react-icons/md'
import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Nav(){
    const [collapse,setCollapse] = useState(false)
    const router = useRouter()

    const sidebarStyle = clsx({
        [styles.container] : !collapse ,
        [styles.collapsed] : collapse
    })

    const name = clsx({
        [styles.name] : !collapse ,
        [styles.name_collapsed] : collapse
    })

    const toggleIcon = clsx({
        [styles.btn] : !collapse ,
        [styles.collapseBtn] : collapse
    })

    const toggleCollapse = () => {
        setCollapse((prev)=>{
            return !prev;
        })
    }
 
    const logout = async () => {
        const response = await axios.get('http://localhost:3000/api/logout')
        if(response.data.success) router.push('/')
    }

    return (
        <div className = {styles.wrapper}>
            <button className = {toggleIcon} onClick = {toggleCollapse}>
                {
                    collapse ? 
                    <BsFillArrowRightCircleFill/>
                    :
                    <BsFillArrowLeftCircleFill/>
                }
            </button>
            <aside className = {sidebarStyle}>
                <div className = {styles.imgContainer}>
                    <Image
                        src={'/MaidIn.png'}
                        width = {300}
                        height = {300}
                        alt = {'Maid In logo'}
                    />
                </div>
                <div className = {styles.listContainer}>
                    <ul className = {styles.list}>
                        <li className = {styles.item}>
                            <Link href={'/App/Dashboard'} className = {styles.link}>    
                                <span className = {styles.icon}>
                                    <RxDashboard/>
                                </span>
                                <span className = {name}>
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className = {styles.item}>
                            <Link href={'/App/Users'} className = {styles.link}>    
                                <span className = {styles.icon}>
                                    <FiUsers/>
                                </span>
                                <span className = {name}>
                                    Users
                                </span>
                            </Link>
                        </li>
                        <li className = {styles.item}>
                            <Link href={'/App/Pending'} className = {styles.link}>    
                                <span className = {styles.icon}>
                                    <MdPending/>
                                </span>
                                <span className = {name}>
                                    Pending
                                </span>
                            </Link>
                        </li>
                        <li className = {styles.item}>
                            <Link href={'/App/Transactions'} className = {styles.link}>    
                                <span className = {styles.icon}>
                                    <GrTransaction/>
                                </span>
                                <span className = {name}>
                                    Transactions
                                </span>
                            </Link>
                        </li>
                        <li className = {styles.item}>
                            <Link href={'/App/Services'} className = {styles.link}>    
                                <span className = {styles.icon}>
                                    <GrServices/>
                                </span>
                                <span className = {name}>
                                    Services
                                </span>
                            </Link>
                        </li>
                        <li className = {styles.item}>
                            <Link href={'/App/Complaints'} className = {styles.link}>    
                                <span className = {styles.icon}>
                                    <BiPhoneCall/>
                                </span>
                                <span className = {name}>
                                    Complaints
                                </span>
                            </Link>
                        </li>
                        <li className = {styles.item} onClick = {logout}>
                            <span className = {styles.icon}>
                                <AiOutlineLogout/>
                            </span>
                            <span className = {name}>
                                Log Out
                            </span>
                        </li>
                        
                    </ul>
                </div>
            </aside>
        </div>
    )
}