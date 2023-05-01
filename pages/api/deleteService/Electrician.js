import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongo/index'
import { hasCookie } from "cookies-next";

export default async function deleteService(req,res){
    if(req.method === 'POST' && hasCookie('token',{req,res})){
        const client = await clientPromise
        const db = client.db('test')
        const collection = db.collection('electricians')
        const { id } = req.body
        const result = await collection.deleteOne({
            _id : new ObjectId(id)
        })
        result.deletedCount ? res.json({
            success : true
        }) : res.json({
            success : false ,
            tokenExpired : false
        })
    }
    else res.json({ success : false , tokenExpired : true })
}