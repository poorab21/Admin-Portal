import clientPromise from '../../../../lib/mongo/index'

export default async function InProgress(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise;
        const db = client.db('test')
        const collection = db.collection('one-off transactions')
        const seeker = db.collection('service seekers')
        const servicemen = db.collection('Service_Provider')
        const result = await collection.find({
            $and : [
                {
                    InProgress : true ,
                    completed : false ,
                }
            ]
        }).toArray()

        for(let i = 0 ; i < result.length ; i++ ){
            const customer = await seeker.findOne({ _id : result[i].customer[0] })
            const provider = await servicemen.findOne({ _id : result[i].provider[0] })
            result[i] = {
                ...result[i] ,
                customer : customer.firstname + ' ' + customer.lastname ,
                provider : provider.firstname + ' ' + provider.lastname
            }
        }

        res.json({
            success : true ,
            transactions : result
        })
    }
}