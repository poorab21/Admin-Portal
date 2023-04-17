import { useRouter } from "next/router"
import styles from '../../../../../styles/OneOff.module.css'
import Layout from "../../../../../Component/Layout"
import FieldData from "../../../../../Component/FieldData"
import clsx from "clsx"

export default function Transaction(){
    const router = useRouter()
    const { 
        TaskList , 
        amount , 
        customer , 
        duration , 
        location ,
        serviceType ,
        start_date  ,
        start_time ,
        TOC
    } = router.query

    const Conditions = (TOC) => {
        if(TOC.length > 0) {
            return TOC.map((value,index)=>{
                return (
                    <tr className = {styles.tbRow}>
                        <td className = {styles.tbData}>{index+1}</td>
                        <td className = {styles.tbData}>{value.condition}</td>
                        <td className = {styles.tbData}>
                            <p className = {clsx({
                            [styles.LOWpriority] : value.priority === 'LOW' ,
                            [styles.MEDIUMpriority] : value.priority === 'MEDIUM' ,
                            [styles.HIGHpriority] : value.priority === 'HIGH' ,
                        })}>
                                {value.priority}
                            </p>
                        </td>
                    </tr>
                )
            })
        }
        else {
            return (
                <tr className = {styles.tbRow}>
                    <td className = {styles.tbData} colSpan={3}>
                        <center>
                            No Conditions set by Customer
                        </center>
                    </td>
                </tr>
            )
        }
    }

    const month = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return (
        <>
            <Layout>
                <div className = {styles.container}>
                    <div className = {styles.header}>
                        <p className = {styles.transactionID}>{`One-Off Request #${router.query.transaction}`}</p>
                    </div>
                    <div className = {styles.info}>
                        <div className = {styles.leftSide}>
                            <div style = {{ display : 'flex' , flex : 1 }}>
                                <FieldData 
                                field = {'Start Date'} 
                                value = {`${
                                    (new Date(start_date)).getDate()
                                    } ${month[(new Date(start_date)).getMonth()]} ${(new Date(start_date)).getFullYear()}`}/>
                            </div>
                            <div style = {{ display : 'flex' , flex : 1 }}>
                                <FieldData field = {'Start Time'} value = {start_time}/>
                            </div>
                            <div style = {{ display : 'flex' , flex : 1 }}>
                                <FieldData field = {'Service Type'} value = {serviceType}/>
                            </div>
                            <div style = {{ display : 'flex' , flex : 1 }}>
                                <FieldData field = {'Customer'} value = {customer}/>
                            </div>
                            <div style = {{ display : 'flex' , flex : 1 }}>
                                <FieldData field = {'Servicemen'} value = {'Not Assigned yet'}/>
                            </div>
                            <div style = {{ display : 'flex' , flex : 1 }}>
                                <FieldData field = {'Service Location'} value = {location}/>
                            </div>
                        </div>
                        <div className = {styles.rightSide}>
                            <table className = {styles.tasklist}>
                                <tbody>
                                    <tr className = {styles.tbRow}>
                                        <th className = {styles.tbHead}>S.NO</th>
                                        <th className = {styles.tbHead}>Task</th>
                                        <th className = {styles.tbHead}>Hourly Wage</th>
                                        <th className = {styles.tbHead}>Duration</th>
                                    </tr>
                                    {
                                        TaskList && (JSON.parse(TaskList)).map((value,index)=>{
                                            return (
                                                <tr className = {styles.tbRow} key={index}>
                                                    <td className = {styles.tbData}>{index+1}</td>
                                                    <td className = {styles.tbData}>{value.task}</td>
                                                    <td className = {styles.tbData}>{`${value.hourly_price}/PKR`}</td>
                                                    <td className = {styles.tbData}>{`${value.duration}/min`}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr className = {styles.total}>
                                        <td className = {styles.tbData}></td>
                                        <td className = {styles.tbData}></td>
                                        <td className = {styles.tbData}>
                                            {`${amount} PKR`}
                                        </td>
                                        <td className = {styles.tbData}>{`${duration}/min`}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className = {styles.conditionList}>
                                <tbody>
                                    <tr className = {styles.tbRow}>
                                        <th className = {styles.tbHead}>S.NO</th>
                                        <th className = {styles.tbHead}>Condition</th>
                                        <th className = {styles.tbHead}>Priority</th>
                                    </tr>
                                    {
                                        TOC && Conditions(JSON.parse(TOC))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}