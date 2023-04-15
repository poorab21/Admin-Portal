import clientPromise from '../../../lib/mongo/index'

export default async function Pending(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db('test')
        const servicemen = db.collection('Service_Provider')
        const result = await servicemen.aggregate([
            {
                $match : { registered : false }
            },
            {
                $lookup : {
                    from : 'references' ,
                    localField : 'references' ,
                    foreignField : '_id' ,
                    as : 'references'
                }
            }
        ]).toArray()

        res.json({
            success : true ,
            pendings : result
        })
    }
}