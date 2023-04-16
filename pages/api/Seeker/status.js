import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function Status(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise
        const db = client.db('test')
        const seeker = db.collection('service seekers')
        const { id , status } = req.body
        const result =  await seeker.findOneAndUpdate({ _id : new ObjectId(id) },{
            $set : { blocked : status }
        },{ new : true })
        
        result.value ? res.json({
            success : true 
        }) : res.json({
            success : false
        })
    }
}