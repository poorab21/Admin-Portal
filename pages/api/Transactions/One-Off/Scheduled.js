import clientPromise from "../../../../lib/mongo";

export default async function Scheduled(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise;
        const db = client.db('test');
        const collection = db.collection('one-off transactions')
        const result = await collection.aggregate([
            {
                $match : { 
                    $and : [
                        { cancelled : false } ,
                        { scheduled : true } ,
                        { completed : false } ,
                        { InProgress : false }
                    ]
                 }
            },
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