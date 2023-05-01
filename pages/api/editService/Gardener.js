import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongo/index'
import { hasCookie } from "cookies-next";

export default async function editService(req,res){
    if(req.method === 'POST' && hasCookie('token',{req,res})){
        const client = await clientPromise
        const db = client.db('test')
        const collection = db.collection('gardenings')
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
            success : false ,
            tokenExpired : false
        })
    }
    else res.json({ success : false , tokenExpired : true })
}  