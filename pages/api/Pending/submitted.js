import { hasCookie } from "cookies-next";
import clientPromise from "../../../lib/mongo";
import { ObjectId } from "mongodb";

export default async function Submitted(req,res){
    if(req.method === 'POST' && hasCookie('token',{req,res})){
        const client = await clientPromise
        const { id } = req.body
        const db = client.db('test')
        const servicemen = db.collection('Service_Provider')
        const result = await servicemen.findOneAndUpdate({
            _id : new ObjectId(id)
        },{
            $set : { credentials : true }
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