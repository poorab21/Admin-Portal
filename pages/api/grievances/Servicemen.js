import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongo/index'

export default async function SSQueries(req,res){
    if(req.method === 'GET'){
        let grievances = []
        const client = await clientPromise
        const db = client.db('test')
        const collection = db.collection('servicemen_queries')
        const servicemen_collection = db.collection('Service_Provider')
        const result  = await collection.find({}).toArray()

        for(let i = 0 ; i < result.length ; i++ ){
            const servicemen = await servicemen_collection.findOne({
                _id : result[i].servicemenID
            })
            grievances.push({
                _id : result[i]._id ,
                email : result[i].email ,
                submission : result[i].submission ,
                person : servicemen.firstname + ' ' + servicemen.lastname
            })
        }

        res.json({
            success : true ,
            grievances : grievances
        })
    }
}