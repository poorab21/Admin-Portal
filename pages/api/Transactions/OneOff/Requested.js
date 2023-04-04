import clientPromise from '../../../../lib/mongo/index'

export default async function Requested(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise;
        const db = client.db('test')
        const collection = db.collection('one-off transactions')
        const seeker = db.collection('service seekers')
        const servicemen = db.collection('Service_Provider')
        const result = await collection.find({
            $and : [
                {
                    InProgress : false ,
                    completed : false ,
                }
            ]
        }).toArray()

        for(let i = 0 ; i < result.length ; i++ ){
            const customer = await seeker.findOne({ _id : result[i].customer[0] })
            result[i] = {
                ...result[i] , 
                customer : customer.firstname + ' ' + customer.lastname
            }
        }

        for(let i = 0 ; i < result.length ; i++ ){
            let requestees_info = []
            for(let j = 0 ; j < result[i].requestees.length ; j++ ){
                const requestee = await servicemen.findOne({ _id : result[i].requestees[j] })
                requestees_info.push({
                    name : requestee.firstname + ' ' + requestee.lastname ,
                    contact : requestee.contact ,
                    email : requestee.email
                })
            }
            result[i].requestees = requestees_info
        }

        res.json({
            success : true ,
            transactions : result
        })
    }
}