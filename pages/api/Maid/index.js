import clientPromise from '../../../lib/mongo/index'

export default async function Gardener(req,res){
    if(req.method === 'POST'){    
        const client = await clientPromise;
        const db = client.db('test');
        const collection = db.collection('maids')
        const result = await collection.find({}).toArray()
        res.json({
            data : result
        })
    }
}