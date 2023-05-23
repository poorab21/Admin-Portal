import clientPromise from '../../../lib/mongo/index'
import moment from 'moment/moment'

let endOfMonth = moment().endOf('month').toDate()
let startOfMonth = moment().startOf('month').toDate()

const isNew = (registration_date) => {
    if(moment(registration_date).isBefore(endOfMonth) && moment(registration_date).isAfter(startOfMonth)){
        return true
    }
    return false
}

const getServicemenCount = async (collection) => {
    const result = await collection.find({}).project({ 
        serviceType : true , 
        registration_date : true, 
        _id : false 
    }).toArray()
    let cleaners = 0;
    let maids = 0;
    let electricians = 0;
    let gardeners = 0;
    let newServicemen = 0;
    
    if(!result.length) return null;

    for(let i = 0 ; i < result.length ; i++ ){
        if(result[i].serviceType === 'Cleaner') { cleaners++ ; isNew(result[i].registration_date) ? newServicemen++ : null }
        else if(result[i].serviceType === 'Maid') { maids++ ; isNew(result[i].registration_date) ? newServicemen++ : null }
        else if(result[i].serviceType === 'Electrician') { electricians++ ; isNew(result[i].registration_date) ? newServicemen++ : null }
        else if(result[i].serviceType === 'Gardener') { gardeners++ ; isNew(result[i].registration_date) ? newServicemen++ : null }
    }
    return { cleaners , maids , electricians , gardeners , newServicemen }
}

const getSeekerCount = async (collection) => {
    const result = await collection.find({}).project({ registration_date : true }).toArray()
    let newSeekers = 0;
    if(!result.length) return null
    
    for(let i = 0 ; i < result.length ; i++ ){ isNew(result[i].registration_date) ? newSeekers++ : null }

    return { newSeekers , totalSeekers : result.length }
}

const getRecentGrievances = async (servicemen_collection,seeker_collection) => {
    const result = await servicemen_collection.aggregate([
        { $match : { $and : [
            {} 
        ]} 
        },
        { $lookup : {
            from : 'Service_Provider' ,
            localField : 'servicemenID' ,
            foreignField : '_id' ,
            as : 'servicemen' }
        }
    ]).toArray()

    const result2 = await seeker_collection.aggregate([
        { $match : { $and : [
            {} 
        ]} 
        },
        { $lookup : {
            from : 'service seekers' ,
            localField : 'customer' ,
            foreignField : '_id' ,
            as : 'customer' }
        }
    ]).toArray()

    const recentGrievance = []
    if(!result.length && !result2.length) return null

    for(let i = 0 ; i < result.length ; i++ ){
        if(isNew(new Date(result[i].submission))) {
            recentGrievance.push({
                message : result[i].email ,
                sender : result[i].servicemen[0].firstname + ' ' + result[i].servicemen[0].lastname ,
                usertype : result[i].servicemen[0].serviceType
            })
        }
    }

    for(let i = 0 ; i < result2.length ; i++ ){
        if(isNew(new Date(result2[i].submission))) {
            recentGrievance.push({
                message : result2[i].message ,
                sender : result2[i].customer[0].firstname + ' ' + result2[i].customer[0].lastname ,
                usertype : 'Customer'
            })
        }
    }

    return recentGrievance;
}

const getTransactionStatistics = async (collection) => {
    const result = await collection.find({}).project({ 
        transaction_type : true , 
        generated_Amount : true ,
        Ratings : true ,
        service_type : true
    }).toArray()

    if(!result.length) return null

    const OneOff = {
        successful : 0 ,
        unsuccessful : 0 ,
        revenue : 0
    }

    const contract = {
        successful : 0 ,
        unsuccessful : 0 ,
        revenue : 0
    }

    const service_revenue = {
        Maid : 0 ,
        Electrician : 0 ,
        Gardener : 0 ,
        Cleaner : 0
    }

    for(let i = 0 ; i < result.length ; i++ ){
        if(result[i].transaction_type === 'One-Off'){
            OneOff['revenue'] += result[i].generated_Amount
            result[i].Ratings < 3 ? OneOff['unsuccessful']++ : OneOff['successful']++
            service_revenue[`${result[i].service_type}`] += result[i].generated_Amount
        }
        else if(result[i].transaction_type === 'Contract'){
            contract['revenue'] += result[i].generated_Amount
            result[i].Ratings < 3 ? contract['unsuccessful']++ : contract['successful']++
            service_revenue[`${result[i].service_type}`] += result[i].generated_Amount
        }
    }

    return { service_revenue , OneOff , contract }
}

export default async function Dashboard(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db('test')
        const servicemen = db.collection('Service_Provider')
        const seekers = db.collection('service seekers')
        const completed_transactions = db.collection('Completed_Transactions')
        const servicemen_result = await getServicemenCount(servicemen)
        const seeker_result = await getSeekerCount(seekers)
        const transaction_result = await getTransactionStatistics(completed_transactions)
        const seeker_queries = db.collection('seeker queries')
        const servicemen_queries = db.collection('servicemen_queries')
        const grievances_result = await getRecentGrievances(servicemen_queries,seeker_queries)
        
        grievances_result ? res.json({
            success : true ,
            dashboard_data : { grievances_result , transaction_result , seeker_result , servicemen_result }
        }) : res.json({ success : false , msg : 'No Data Available' })
    }
}