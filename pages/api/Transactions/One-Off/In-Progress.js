import clientPromise from '../../../../lib/mongo/index'

export default async function InProgress(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise;
        const db = client.db('test')
        const collection = db.collection('one-off transactions')
        const result = await collection.aggregate([
            { $match : {
                $and : [
                    {
                        InProgress : true 
                    },
                    {
                        completed : false ,
                    }
                ]
            }},
            { $lookup : {
                from : 'Service_Provider' ,
                localField : 'provider' ,
                foreignField : '_id' ,
                as : 'provider' }
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
            transactions : result
        })
    }
}