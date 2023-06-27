import clientPromise from "../../../lib/mongo";
import { pbkdf2Sync } from "crypto";

export default async function ResetPassword(req,res){
    if(req.method === 'POST'){
        const { email , password } = req.body
        const client = await clientPromise
        const db = client.db('test')
        const admin = db.collection('admin')
        const hashedPassword = pbkdf2Sync(password,'f844b09ff50c',1000,64,'sha256').toString('hex')
        const result = await admin.findOneAndUpdate({
            email : email
        },{
            $set : {
                password : hashedPassword
            }
        },{
            upsert : false
        })

        result.value ? res.json({
            success : true
        }) : res.json({
            success : false
        })
    }
}