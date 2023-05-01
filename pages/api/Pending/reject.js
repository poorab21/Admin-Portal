import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";
import { hasCookie } from "cookies-next";

export default async function Reject(req,res){
    if(req.method === 'POST' && hasCookie('token',{req,res})){
        const client = await clientPromise
        const { id } = req.body
        const db = client.db('test')
        const servicemen = db.collection('Service_Provider')
        const result = await servicemen.deleteOne({ _id : new ObjectId(id) })
        result.deletedCount ? res.json({
            success : true 
        }) : res.json({
            success : false ,
            tokenExpired : false
        })
    }
    else res.json({ success : false , tokenExpired : true })
}