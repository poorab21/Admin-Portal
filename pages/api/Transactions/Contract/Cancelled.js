import clientPromise from "../../../../lib/mongo";

export default async function Cancelled(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise;
        const db = client.db('test');
        const collection = db.collection('contract-transactions')
        const result = await collection.aggregate([
            {
                $match : {
                    $and : [
                        { cancelled : true } ,
                        { scheduled : false } ,
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