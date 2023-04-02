import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongo/index'

export default async function deleteService(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise
        const db = client.db('test')
        const collection = db.collection('gardenings')
        const { id } = req.body
        const result = await collection.deleteOne({
            _id : new ObjectId(id)
        })
        result.deletedCount ? res.json({
            success : true
        }) : res.json({
            success : false
        })
    }   
}