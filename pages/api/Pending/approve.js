import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function Approve(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise
        const { id } = req.body
        const db = client.db('test')
        const servicemen = db.collection('Service_Provider')
        const result = await servicemen.findOneAndUpdate({ _id : new ObjectId(id) },{ 
            $set : {
                registration_date : new Date() ,
                registered : true
            } 
         })
        result.value ? res.json({
            success : true 
        }) : res.json({
            success : false
        })
    }
}