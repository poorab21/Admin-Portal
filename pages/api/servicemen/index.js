import clientPromise from '../../../lib/mongo/index'

export default async function Servicemen(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db('test')
        const servicemen = db.collection('Service_Provider')
        const result = await servicemen.find({
            registered : true
        }).toArray()
        res.json({
            success : true ,
            servicemen : result
        })
    }
}