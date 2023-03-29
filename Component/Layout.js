import Nav from './Nav'
import styles from '../styles/layout.module.css'

export default function Layout({children}){
    return (
        <div className = {styles.layout}>
            <Nav/>
            {
                children
            }
        </div>
    )
}