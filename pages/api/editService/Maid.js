import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongo/index'

export default async function editService(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise
        const db = client.db('test')
        const collection = db.collection('maids')
        const { id , task , hourly } = req.body
        const result = await collection.findOneAndUpdate({
            _id : new ObjectId(id)
        },{
            $set : {
                task : task ,
                hourly_wage : hourly
            }
        },{
            upsert : false
        })
        result.value ? res.json({
            success : true 
        }) : res.json({
            success : false
        })
    }
}  