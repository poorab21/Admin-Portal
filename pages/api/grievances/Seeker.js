import clientPromise from '../../../lib/mongo/index'

export default async function SSQueries(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db('test')
        const collection = db.collection('seeker queries')
        const grievances  = await collection.aggregate([
            {
                $match : {}
            },
            {
                $lookup : {
                    from : 'service seekers' ,
                    localField : 'customer' ,
                    foreignField : '_id' ,
                    as : 'customer'
                }
            }
        ]).toArray()

        
        res.json({
            success : true ,
            grievances : grievances
        })
    }
}