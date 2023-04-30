import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function userImg(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise
        const db = client.db('test')
        const SP = db.collection('Service_Provider')
        const { servicemenID } = req.body

        const result = await SP.findOne({ _id : new ObjectId(servicemenID) } ,{ image : true })
        result ? res.json({
            success : true ,
            image : result.image
        }) : res.json({
            success : false
        })
    }
}