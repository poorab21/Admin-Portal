import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongo/index'

export default async function SSQueries(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db('test')
        const collection = db.collection('servicemen_queries')
        
        const grievances = await collection.aggregate([
            {
                $match : {}
            },
            {
                $lookup : {
                    from : 'Service_Provider' ,
                    localField : 'servicemenID' ,
                    foreignField : '_id' ,
                    as : 'customer'
                }
            }
        ]).toArray()

        res.json({
            success : true ,
            grievances : grievances
        })
    }
}