import { useRouter } from "next/router";
import Layout from "../../../../../Component/Layout";
import styles from '../../../../../styles/Completed.module.css'
import FieldData from '../../../../../Component/FieldData'
import ReactStarsRating from 'react-awesome-stars-rating';

export default function Completed(){
    const router = useRouter()
    const started = new Date(router.query.started)
    const ended = new Date(router.query.ended)
    const Months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let ratings = JSON.parse(router.query.Ratings)
    return (
        <Layout>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <p className = {styles.transactionID}>
                        {router.query.transaction_id}
                    </p>
                </div>
                <hr/>
                <div className = {styles.infoContainer}>
                    <div className = {styles.row}>
                        <FieldData 
                        field = {'Customer'} 
                        value = {router.query.customer} />
                        <FieldData 
                        field = {'Servicemen'} 
                        value = {router.query.provider} />
                    </div>
                    <div className = {styles.row}>
                        <FieldData 
                        field = {'Service Type'} 
                        value = {router.query.service_type} />
                        <FieldData 
                        field = {'Nature'} 
                        value = {router.query.transaction_type} />
                    </div>
                    <div className = {styles.row}>
                        <FieldData
                        field = {'Service Location'}
                        value = {router.query.service_location}
                        />
                        <FieldData
                        field = {'Time Period'}
                        value = {
                            `${started.getDate()} ${Months[started.getMonth()]} ${started.getFullYear()} -
                            ${ended.getDate()} ${Months[ended.getMonth()]} ${ended.getFullYear()}
                            `}
                        />
                    </div>
                    <div className = {styles.row}>
                        <FieldData 
                        field = {'Monthly Wage'} 
                        value = {`${router.query.generated_Amount} PKR`} />
                        <FieldData 
                        field = {'Duration'} 
                        value = {`${router.query.Duration} Month/s`} />
                        <FieldData 
                        field = {'Payment Method'} 
                        value = {router.query.paymentMethod} />
                    </div>
                        <div className = {styles.feedbackbox}>
                            <div style = {{ border : '1px solid black' , width : '100%' , backgroundColor : 'cornflowerblue' }}>    
                                <ReactStarsRating 
                                    isHalf = {true} 
                                    isEdit = {false} 
                                    size = {30} 
                                    primaryColor = {'orange'}
                                    count = {5}
                                    starGap = {4} 
                                    className = {styles.ratingbox}
                                    value = {Number(ratings['$numberDecimal'])} />
                            </div>
                            <p className = {styles.feedback}>{router.query.feedback}</p>
                        </div>
                    </div>
                </div>
        </Layout>
    )
}