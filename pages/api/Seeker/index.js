import clientPromise from '../../../lib/mongo/index'

export default async function Seeker(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db('test')
        const seeker = db.collection('service seekers')
        const result = await seeker.find({}).toArray()
        res.json({
            success :  true ,
            data : result
        })
    }
}