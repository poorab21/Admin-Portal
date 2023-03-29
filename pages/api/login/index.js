import clientPromise from '../../../lib/mongo/index'
import { pbkdf2Sync } from 'crypto';
import jwt from 'jsonwebtoken';

export default async function AdminAuth(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise;
        const db = client.db('test');
        const admin = db.collection('admin');

        const { email , password } = req.body;
        const hashPassword = pbkdf2Sync(password,'f844b09ff50c',1000,64,'sha256').toString('hex')

        const result = await admin.findOne({
            $and : [
                {
                    email : email
                },
                {
                    password : hashPassword
                }
            ]
        })
        if(result){
            const token = jwt.sign({ name : result.name , email : email , password : password },'secretKey')
            res.json({
                success : true ,
                token : token
            })
        }
        else res.json({
            success : false
        })
    }
}