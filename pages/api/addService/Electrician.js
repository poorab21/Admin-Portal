import clientPromise from "../../../lib/mongo";
import { hasCookie } from "cookies-next";

export default async function addService(req,res){
    if(req.method === 'POST' && hasCookie('token',{req,res})){
        const client = await clientPromise;
        const db = client.db('test')
        const collection = db.collection('electricians')
        const { task , hourly } = req.body
        const result = await collection.insertOne({
            task : task ,
            hourly_wage : hourly
        })
        result.acknowledged ? res.json({
            success : true 
        }) : res.json({
            success : false ,
            tokenExpired : false
        })
    }
    else res.json({ success : false , tokenExpired : true })
}