import { useRouter } from "next/router";
import Layout from "../../../../../Component/Layout";
import styles from '../../../../../styles/Completed.module.css'
import FieldData from '../../../../../Component/FieldData'
import ReactStarsRating from 'react-awesome-stars-rating';
import { Typography , Stack , Grid } from "@mui/material";

export default function Completed(){
    const router = useRouter()
    const started = new Date(router.query.started)
    const ended = new Date(router.query.ended)
    const Months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let ratings = router?.query?.Ratings ? JSON.parse(router.query.Ratings) : '0' 
    
    const oneOffTime = (duration) => {
        let hour = 0;
        while(duration >= 60){
            hour++;
            duration -= 60;
        }
        if(duration > 0) return `${hour} ${hour > 1 ? 'Hours' : 'Hour' } ${duration} ${duration === 1 ? 'Minute' : 'Minutes'}`;
        else return `${hour} ${hour > 1 ? 'Hours' : 'Hour' }`;
    }

    return (
        <Layout>
            <Stack
            direction = {'column'}
            spacing = {2}
            className = {styles.container}
            >
                <Typography className = {styles.heading}>{router.query.transaction_id}</Typography>
                <Grid container>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData field = {'Customer'} value = {router.query.customer} />
                    </Grid>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData field = {'Servicemen'} value = {router.query.provider} />
                    </Grid>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData field = {'Service Type'} value = {router.query.service_type} />
                    </Grid>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData field = {'Nature'} value = {router.query.transaction_type} />
                    </Grid>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData 
                        field = {'Time Period'}
                        value = {
                                `${started.getDate()} ${Months[started.getMonth()]} ${started.getFullYear()} -
                                ${ended.getDate()} ${Months[ended.getMonth()]} ${ended.getFullYear()}
                                `}
                        />
                    </Grid>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData field = {'Monthly Wage'} value = {`${router.query.generated_Amount} PKR`} />
                    </Grid>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData field = {'Duration'} value = {oneOffTime(Number(router.query.Duration))} />
                    </Grid>
                    <Grid lg = {3} md = {3} sm = {6} xs = {12} item>
                        <FieldData field = {'Payment Method'} value = {router.query.paymentMethod} />
                    </Grid>
                    <Grid lg = {12} md = {12} sm = {12} xs = {12} item>
                        <FieldData field = {'Service Location'} value = {router.query.service_location} />
                    </Grid>
                    <Grid lg = {12} md = {12} sm = {12} xs = {12} item>
                            <Stack
                            direction={'column'}
                            className = {styles.feedbackBox}
                            >
                                <ReactStarsRating 
                                isHalf = {true} 
                                isEdit = {false} 
                                size = {30} 
                                primaryColor = {'orange'}
                                count = {5}
                                starGap = {4} 
                                className = {styles.ratingbox}
                                value = { router.query.Ratings ? Number(ratings['$numberDecimal']) : 0} />
                                <Typography className = {styles.feedback}>{router.query.feedback}</Typography>
                            </Stack>
                        </Grid>
                </Grid>
            </Stack>
        </Layout>
    )
}