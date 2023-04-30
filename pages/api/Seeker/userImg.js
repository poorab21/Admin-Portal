import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function userImg(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise
        const db = client.db('test')
        const Seeker = db.collection('service seekers')
        const { seekerID } = req.body

        const result = await Seeker.findOne({ _id : new ObjectId(seekerID) } ,{ image : true })
        result ? res.json({
            success : true ,
            image : result.image
        }) : res.json({
            success : false
        })
    }
}