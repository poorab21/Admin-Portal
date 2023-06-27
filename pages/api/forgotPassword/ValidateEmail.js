import clientPromise from '../../../lib/mongo/index'

export default async function ValidateEmail(req,res){
    if(req.method === 'POST'){
        const { email } = req.body
        const client = await clientPromise
        const db = client.db('test')
        const admin = db.collection('admin')
        const result = await admin.findOne({
            email : email
        })
        result ? res.json({
            success : true
        }) : res.json({
            success : false
        })
    }
}