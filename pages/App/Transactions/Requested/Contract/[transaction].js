import { useRouter } from "next/router"
import Layout from "../../../../../Component/Layout"
import styles from '../../../../../styles/Contract.module.css'
import FieldData from "../../../../../Component/FieldData"
import clsx from "clsx"
import moment from "moment/moment"

export default function Transaction(){
    const router = useRouter()
    const {
        TOC ,
        customer ,
        end_hours ,
        location , 
        months ,
        montly_wage ,
        serviceType ,
        start_date ,
        start_hour ,
    } = router.query
    const month = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let endDate = new Date(start_date)
    endDate = moment(endDate).add(months,'months').toDate()

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

    return (
        <>
            <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.transactionID}>{`Contract Request #${router.query.transaction}`}</p>
                </div>
                <div className = {styles.info}>
                    <div className = {styles.row}>
                        <FieldData field = {'Contract Duration'} value = {`${
                            (new Date(start_date)).getDate()} ${month[(new Date(start_date)).getMonth()]} ${
                                (new Date(start_date)).getFullYear()} - ${endDate.getDate()} ${
                                    month[endDate.getMonth()]
                                } ${ endDate.getFullYear() }`} />
                        <FieldData field = {'Work Hours'} value = {`${start_hour} - ${end_hours}`} />
                    </div>
                    <div className = {styles.row}>
                        <FieldData field = {'Montly Wage'} value = {`${montly_wage} PKR`} />
                        <FieldData field = {'Service Type'} value = {serviceType} />
                    </div>
                    <div className = {styles.row}>
                        <FieldData field = {'Customer'} value = {customer} />
                        <FieldData field = {'Serviceman'} value = {'Not Assigned yet'} />
                    </div>
                    <div className = {styles.row}>
                        <FieldData field = {'Service Location'} value = {location} /> 
                    </div>
                    <table className = {styles.conditionList}>
                        <tbody>
                            <tr>
                                <th className = {styles.tbHead}>
                                    S.NO
                                </th>
                                <th className = {styles.tbHead}>
                                    Condition
                                </th>
                                <th className = {styles.tbHead}>
                                    Priority
                                </th>
                            </tr>
                            {
                                TOC && Conditions(JSON.parse(TOC))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </Layout>
        </>
    )
}