import clientPromise from "../../../lib/mongo";

export default async function addService(req,res){
    if(req.method === 'POST'){
        const client = await clientPromise;
        const db = client.db('test')
        const collection = db.collection('cleaner/washers')
        const { task , hourly } = req.body
        const result = await collection.insertOne({
            task : task ,
            hourly_wage : hourly
        })
        result.acknowledged ? res.json({
            success : true 
        }) : res.json({
            success : false
        })
    }
}