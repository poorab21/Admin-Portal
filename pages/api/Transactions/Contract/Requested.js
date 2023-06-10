import clientPromise from '../../../../lib/mongo/index'

export default async function Requested(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise;
        const db = client.db('test')
        const collection = db.collection('contract-transactions')
        const result = await collection.aggregate([
            { $match : {
                $and : [
                    {
                        InProgress : false 
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
            },
            {
                $lookup : {
                    from : 'Service_Provider' ,
                    localField : 'requestees' ,
                    foreignField : '_id' ,
                    as : 'requestees'
                }
            }
        ]).toArray()
        

        res.json({
            success : true ,
            transactions : result
        })
    }
}