import clientPromise from "../../../../lib/mongo";
import endOfDay from 'date-fns/endOfDay'
import startOfDay from "date-fns/startOfDay";
export default async function Completed(req,res){

    if(req.method === 'POST'){
        let { date } = req.body;
        date = new Date(date)
        const client = await clientPromise
        const db = client.db('test')
        const completed = db.collection('Completed_Transactions')
        const result = await completed.aggregate([
            { $match : { $and : [
                { 
                    transaction_type : 'Contract'
                } , 
                {
                    ended : { $gte : startOfDay(date) , $lt : endOfDay(date) } ,
                }
            ]}
            },
            { $lookup : {
                from : 'Service_Provider' ,
                localField : 'provider' ,
                foreignField : '_id' ,
                as : 'provider' }
            },
            {
                $lookup : {
                    from : 'service seekers' ,
                    localField : 'customer' ,
                    foreignField : '_id' ,
                    as : 'customer'
                }
            }
        ]).toArray()
        res.json({
            success : true ,
            transactions : result
        })
    }
}